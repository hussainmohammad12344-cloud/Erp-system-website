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
    Select,
    Space,
    Switch,
    Table,
} from "antd"
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
} from "@ant-design/icons"
import { FEATURE_ICON_OPTIONS } from "@/constants/featureIcons"
import { getFeatureIcon } from "@/lib/featureIcons"

export default function FeaturesDashboardPage() {
    const { message } = App.useApp()
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form] = Form.useForm()

    async function loadFeatures() {
        setLoading(true)
        try {
            const res = await fetch("/api/features?all=true")
            if (!res.ok) throw new Error("Failed to load")
            const data = await res.json()
            setFeatures(data)
        } catch {
            message.error("بارگذاری قابلیت ها ناموفق بود")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadFeatures()
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
                title: editing.title,
                description: editing.description,
                icon: editing.icon,
                order: editing.order,
                isActive: editing.isActive,
            })
        } else {
            form.setFieldsValue({
                icon: FEATURE_ICON_OPTIONS[0].value,
                order: features.length + 1,
                isActive: true,
            })
        }
    }

    async function handleSubmit(values) {
        setSaving(true)
        try {
            const url = editing
                ? `/api/features/${editing._id}`
                : "/api/features"
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

            message.success(editing ? "قابلیت ویرایش شد" : "قابلیت اضافه شد")
            setModalOpen(false)
            await loadFeatures()
        } catch (error) {
            message.error(error.message || "ذخیره ناموفق بود")
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id) {
        try {
            const res = await fetch(`/api/features/${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Delete failed")
            message.success("قابلیت حذف شد")
            await loadFeatures()
        } catch {
            message.error("حذف ناموفق بود")
        }
    }

    async function toggleActive(record, checked) {
        try {
            const res = await fetch(`/api/features/${record._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: checked }),
            })
            if (!res.ok) throw new Error("Update failed")
            setFeatures((prev) =>
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
            title: "آیکون",
            dataIndex: "icon",
            width: 80,
            render: (icon) => (
                <span className="text-primary text-xl">
                    {getFeatureIcon(icon)}
                </span>
            ),
        },
        {
            title: "عنوان",
            dataIndex: "title",
        },
        {
            title: "توضیحات",
            dataIndex: "description",
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
                        title="حذف این قابلیت؟"
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
                    <h1 className="text-2xl font-bold text-foreground">مدیریت قابلیت ها</h1>
                    <p className="mt-1 text-foreground-muted">
                        کارت‌های بخش «مدیریت کامل کسب و کار شما» در صفحه اصلی
                    </p>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                    افزودن قابلیت
                </Button>
            </div>

            <Table
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={features}
                pagination={false}
            />

            <Modal
                title={editing ? "ویرایش قابلیت" : "افزودن قابلیت"}
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
                        name="title"
                        label="عنوان"
                        rules={[{ required: true, message: "عنوان الزامی است" }]}
                    >
                        <Input placeholder="مثلاً حسابداری" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="توضیحات"
                        rules={[{ required: true, message: "توضیحات الزامی است" }]}
                    >
                        <Input.TextArea rows={3} placeholder="توضیح کوتاه کارت" />
                    </Form.Item>

                    <Form.Item
                        name="icon"
                        label="آیکون"
                        rules={[{ required: true, message: "آیکون الزامی است" }]}
                    >
                        <Select
                            options={FEATURE_ICON_OPTIONS.map((option) => ({
                                value: option.value,
                                label: (
                                    <span className="flex items-center gap-2">
                                        {getFeatureIcon(option.value, "text-base")}
                                        {option.label}
                                    </span>
                                ),
                            }))}
                        />
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
