"use client"

import {useState} from "react"
import {App, Button, Collapse, Form, Input} from "antd"

export default function FaqSection({faqs = []}) {
    const {message} = App.useApp()
    const [submitting, setSubmitting] = useState(false)
    const [form] = Form.useForm()

    const items = faqs.map((faq) => ({
        key: faq._id,
        label: faq.question,
        children: (
            <p className="leading-8 text-foreground-muted">{faq.answer}</p>
        ),
        styles: {
            header: {
                paddingInline: 0,
                paddingBlock: 20,
                fontWeight: 600,
                fontSize: 16,
            },
            body: {
                paddingInline: 0,
                paddingBottom: 20,
            },
        },
    }))

    async function handleSubmit(values) {
        setSubmitting(true)
        try {
            const res = await fetch("/api/faq-questions", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            })

            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(data.error || "ارسال ناموفق بود")
            }

            message.success("سوال شما ثبت شد؛ به‌زودی پاسخ می‌دهیم.")
            form.resetFields()
        } catch (error) {
            message.error(error.message || "ارسال سوال ناموفق بود")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section id="faq" className="container mx-auto px-6 py-32">
            <div className="mx-auto mb-16 max-w-2xl text-center">
                <h2 className="text-4xl font-bold text-foreground">
                    سوالات متداول
                </h2>
                <p className="mt-5 leading-8 text-foreground-muted">
                    پاسخ پرسش‌های رایج درباره فلش، تعرفه‌ها و راه‌اندازی.
                </p>
            </div>

            {items.length > 0 && (
                <div className="mx-auto max-w-3xl">
                    <Collapse
                        accordion
                        bordered={false}
                        defaultActiveKey={items[0] ? [items[0].key] : []}
                        items={items}
                        className="faq-collapse bg-transparent!"
                        style={{background: "transparent"}}
                    />
                </div>
            )}

            <div className="mx-auto mt-20 max-w-3xl border-t border-border pt-16">
                <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-foreground">
                        سوال دیگری دارید؟
                    </h3>
                    <p className="mt-3 text-foreground-muted leading-7">
                        سوال خود را ارسال کنید؛ تیم پشتیبانی پاسخ را به ایمیل شما
                        می‌فرستد.
                    </p>
                </div>
                <div className="rounded-xl border border-border bg-background-secondary p-5">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark={false}
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Form.Item
                                name="name"
                                label="نام"
                                rules={[
                                    {required: true, message: "نام الزامی است"},
                                ]}
                            >
                                <Input size="large" placeholder="نام شما"/>
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="ایمیل"
                                rules={[
                                    {required: true, message: "ایمیل الزامی است"},
                                    {
                                        type: "email",
                                        message: "ایمیل معتبر وارد کنید",
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    type="email"
                                    placeholder="email@example.com"
                                    dir="ltr"
                                    className="text-left"
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="question"
                            label="سوال شما"
                            rules={[
                                {required: true, message: "سوال الزامی است"},
                                {
                                    min: 10,
                                    message: "سوال باید حداقل ۱۰ کاراکتر باشد",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="سوال خود را به‌صورت واضح بنویسید..."
                                showCount
                                maxLength={500}
                            />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={submitting}
                            block
                        >
                            ارسال سوال
                        </Button>
                    </Form>

                </div>

            </div>
        </section>
    )
}
