"use client"

import { useEffect, useState } from "react"
import {
    App,
    Button,
    Form,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Space,
    Switch,
    Table,
} from "antd"
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
} from "@ant-design/icons"

export default function FaqsDashboardPage() {
    const { message } = App.useApp()
    const [faqs, setFaqs] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form] = Form.useForm()

    async function loadFaqs() {
        setLoading(true)
        try {
            const res = await fetch("/api/faqs?all=true")
            if (!res.ok) throw new Error("Failed to load")
            const data = await res.json()
            setFaqs(data)
        } catch {
            message.error("بارگذاری سوالات ناموفق بود")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadFaqs()
    }, [])

    function openCreate() {
        setEditing(null)
        setModalOpen(true)
    }

    function openEdit(record) {
        setEditing(record)
        setModalOpen(true)
    }

    function handleAfterOpenChange(open) {
        if (!open) {
            form.resetFields()
            setEditing(null)
            return
        }

        if (editing) {
            form.setFieldsValue({
                question: editing.question,
                answer: editing.answer,
                order: editing.order,
                isActive: editing.isActive,
            })
        } else {
            form.setFieldsValue({
                order: faqs.length + 1,
                isActive: true,
            })
        }
    }

    async function handleSubmit(values) {
        setSaving(true)
        try {
            const url = editing ? `/api/faqs/${editing._id}` : "/api/faqs"
            const method = editing ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(data.error || "Request failed")
            }

            message.success(editing ? "سوال ویرایش شد" : "سوال اضافه شد")
            setModalOpen(false)
            await loadFaqs()
        } catch (error) {
            message.error(error.message || "ذخیره ناموفق بود")
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id) {
        try {
            const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Delete failed")
            message.success("سوال حذف شد")
            await loadFaqs()
        } catch {
            message.error("حذف ناموفق بود")
        }
    }

    async function toggleActive(record, checked) {
        try {
            const res = await fetch(`/api/faqs/${record._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: checked }),
            })
            if (!res.ok) throw new Error("Update failed")
            setFaqs((prev) =>
                prev.map((item) =>
                    item._id === record._id
                        ? { ...item, isActive: checked }
                        : item
                )
            )
        } catch {
            message.error("به‌روزرسانی وضعیت ناموفق بود")
        }
    }

    const columns = [
        {
            title: "سوال",
            dataIndex: "question",
            ellipsis: true,
        },
        {
            title: "پاسخ",
            dataIndex: "answer",
            ellipsis: true,
        },
        {
            title: "ترتیب",
            dataIndex: "order",
            width: 90,
            sorter: (a, b) => a.order - b.order,
        },
        {
            title: "وضعیت",
            dataIndex: "isActive",
            width: 120,
            render: (isActive, record) => (
                <Switch
                    checked={isActive}
                    checkedChildren="فعال"
                    unCheckedChildren="غیرفعال"
                    onChange={(checked) => toggleActive(record, checked)}
                />
            ),
        },
        {
            title: "عملیات",
            key: "actions",
            width: 140,
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openEdit(record)}
                    />
                    <Popconfirm
                        title="حذف این سوال؟"
                        okText="حذف"
                        cancelText="انصراف"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        مدیریت سوالات متداول
                    </h1>
                    <p className="mt-1 text-foreground-muted">
                        سوال‌های بخش FAQ در صفحه اصلی
                    </p>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                    افزودن سوال
                </Button>
            </div>

            <Table
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={faqs}
                pagination={false}
            />

            <Modal
                title={editing ? "ویرایش سوال" : "افزودن سوال"}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                afterOpenChange={handleAfterOpenChange}
                onOk={() => form.submit()}
                confirmLoading={saving}
                okText="ذخیره"
                cancelText="انصراف"
                destroyOnHidden
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="mt-4"
                >
                    <Form.Item
                        name="question"
                        label="سوال"
                        rules={[{ required: true, message: "سوال الزامی است" }]}
                    >
                        <Input placeholder="مثلاً آیا نسخه رایگان محدودیت دارد؟" />
                    </Form.Item>

                    <Form.Item
                        name="answer"
                        label="پاسخ"
                        rules={[{ required: true, message: "پاسخ الزامی است" }]}
                    >
                        <Input.TextArea rows={4} placeholder="پاسخ کامل سوال" />
                    </Form.Item>

                    <Form.Item name="order" label="ترتیب نمایش">
                        <InputNumber className="w-full" min={0} />
                    </Form.Item>

                    <Form.Item
                        name="isActive"
                        label="نمایش در سایت"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="فعال" unCheckedChildren="غیرفعال" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
