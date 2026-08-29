"use client"

import { useEffect, useMemo, useState } from "react"
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
    Tag,
} from "antd"
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
} from "@ant-design/icons"
import BillingTypeTabs from "@/components/shared/BillingTypeTabs"
import {
    BILLING_TYPE_LABELS,
    BILLING_TYPE_OPTIONS,
    BILLING_TYPES,
} from "@/constants/pricing"

export default function PricingDashboardPage() {
    const { message } = App.useApp()
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [billingFilter, setBillingFilter] = useState(BILLING_TYPES.monthly)
    const [form] = Form.useForm()

    async function loadPlans() {
        setLoading(true)
        try {
            const res = await fetch("/api/pricing?all=true")
            if (!res.ok) throw new Error("Failed to load")
            const data = await res.json()
            setPlans(data)
        } catch {
            message.error("بارگذاری پلن‌ها ناموفق بود")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPlans()
    }, [])

    const filteredPlans = useMemo(() => {
        return plans
            .filter((plan) => {
                const type =
                    plan.billingType === BILLING_TYPES.yearly ||
                    plan.billingType === BILLING_TYPES.lifetime
                        ? plan.billingType
                        : BILLING_TYPES.monthly
                return type === billingFilter
            })
            .sort((a, b) => a.order - b.order)
    }, [plans, billingFilter])

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
                name: editing.name,
                price: editing.price,
                period: editing.period,
                billingType: editing.billingType || BILLING_TYPES.monthly,
                description: editing.description,
                features: editing.features || [],
                cta: editing.cta,
                highlighted: editing.highlighted,
                order: editing.order,
                isActive: editing.isActive,
            })
        } else {
            form.setFieldsValue({
                period: "",
                billingType: billingFilter,
                features: [],
                highlighted: false,
                order: filteredPlans.length + 1,
                isActive: true,
            })
        }
    }

    async function handleSubmit(values) {
        setSaving(true)
        try {
            const url = editing
                ? `/api/pricing/${editing._id}`
                : "/api/pricing"
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

            message.success(editing ? "پلن ویرایش شد" : "پلن اضافه شد")
            setModalOpen(false)
            await loadPlans()
        } catch (error) {
            message.error(error.message || "ذخیره ناموفق بود")
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id) {
        try {
            const res = await fetch(`/api/pricing/${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Delete failed")
            message.success("پلن حذف شد")
            await loadPlans()
        } catch {
            message.error("حذف ناموفق بود")
        }
    }

    async function toggleActive(record, checked) {
        try {
            const res = await fetch(`/api/pricing/${record._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: checked }),
            })
            if (!res.ok) throw new Error("Update failed")
            setPlans((prev) =>
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

    async function toggleHighlighted(record, checked) {
        try {
            const res = await fetch(`/api/pricing/${record._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ highlighted: checked }),
            })
            if (!res.ok) throw new Error("Update failed")
            await loadPlans()
        } catch {
            message.error("به‌روزرسانی برجسته بودن ناموفق بود")
        }
    }

    const columns = [
        {
            title: "نام پلن",
            dataIndex: "name",
            render: (name, record) => (
                <Space>
                    <span>{name}</span>
                    {record.highlighted && <Tag color="blue">محبوب</Tag>}
                </Space>
            ),
        },
        {
            title: "نوع پرداخت",
            dataIndex: "billingType",
            width: 110,
            render: (billingType) =>
                BILLING_TYPE_LABELS[billingType || BILLING_TYPES.monthly],
        },
        {
            title: "قیمت",
            dataIndex: "price",
            width: 160,
            render: (price, record) => (
                <span>
                    {price}
                    {record.period ? (
                        <span className="mr-1 text-xs text-foreground-muted">
                            {record.period}
                        </span>
                    ) : null}
                </span>
            ),
        },
        {
            title: "امکانات",
            dataIndex: "features",
            width: 90,
            render: (features) => features?.length || 0,
        },
        {
            title: "ترتیب",
            dataIndex: "order",
            width: 80,
            sorter: (a, b) => a.order - b.order,
        },
        {
            title: "محبوب",
            dataIndex: "highlighted",
            width: 90,
            render: (highlighted, record) => (
                <Switch
                    checked={highlighted}
                    onChange={(checked) => toggleHighlighted(record, checked)}
                />
            ),
        },
        {
            title: "وضعیت",
            dataIndex: "isActive",
            width: 110,
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
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openEdit(record)}
                    />
                    <Popconfirm
                        title="حذف این پلن؟"
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
                        مدیریت تعرفه‌ها
                    </h1>
                    <p className="mt-1 text-foreground-muted">
                        پلن‌های ماهانه، سالانه و دایمی در صفحه اصلی
                    </p>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                    افزودن پلن
                </Button>
            </div>

            <BillingTypeTabs
                value={billingFilter}
                onChange={setBillingFilter}
            />

            <Table
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={filteredPlans}
                pagination={false}
            />

            <Modal
                title={editing ? "ویرایش پلن" : "افزودن پلن"}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                afterOpenChange={handleAfterOpenChange}
                onOk={() => form.submit()}
                confirmLoading={saving}
                okText="ذخیره"
                cancelText="انصراف"
                destroyOnHidden
                width={640}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="mt-4"
                >
                    <Form.Item
                        name="billingType"
                        label="نوع پرداخت"
                        rules={[
                            { required: true, message: "نوع پرداخت الزامی است" },
                        ]}
                    >
                        <Select options={BILLING_TYPE_OPTIONS} />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="نام پلن"
                        rules={[{ required: true, message: "نام الزامی است" }]}
                    >
                        <Input placeholder="مثلاً حرفه‌ای" />
                    </Form.Item>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Form.Item
                            name="price"
                            label="قیمت"
                            rules={[
                                { required: true, message: "قیمت الزامی است" },
                            ]}
                        >
                            <Input placeholder="مثلاً ۴۹۰٬۰۰۰ یا رایگان" />
                        </Form.Item>

                        <Form.Item name="period" label="دوره">
                            <Input placeholder="مثلاً تومان / ماه" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="description"
                        label="توضیحات"
                        rules={[
                            { required: true, message: "توضیحات الزامی است" },
                        ]}
                    >
                        <Input.TextArea rows={2} placeholder="توضیح کوتاه پلن" />
                    </Form.Item>

                    <Form.Item
                        name="features"
                        label="امکانات"
                        rules={[
                            {
                                required: true,
                                type: "array",
                                min: 1,
                                message: "حداقل یک امکان وارد کنید",
                            },
                        ]}
                    >
                        <Select
                            mode="tags"
                            tokenSeparators={[","]}
                            placeholder="امکانات را بنویسید و Enter بزنید"
                        />
                    </Form.Item>

                    <Form.Item
                        name="cta"
                        label="متن دکمه"
                        rules={[
                            { required: true, message: "متن دکمه الزامی است" },
                        ]}
                    >
                        <Input placeholder="مثلاً انتخاب پلن حرفه‌ای" />
                    </Form.Item>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Form.Item name="order" label="ترتیب نمایش">
                            <InputNumber className="w-full" min={0} />
                        </Form.Item>

                        <Form.Item
                            name="highlighted"
                            label="پلن محبوب"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="بله" unCheckedChildren="خیر" />
                        </Form.Item>
                    </div>

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
