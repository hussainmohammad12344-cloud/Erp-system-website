import mongoose from "mongoose"

const PricingPlanSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        price: {
            type: String,
            required: [true, "Price is required"],
            trim: true,
        },
        period: {
            type: String,
            default: "",
            trim: true,
        },
        billingType: {
            type: String,
            enum: ["monthly", "yearly", "lifetime"],
            default: "monthly",
            required: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        features: {
            type: [String],
            default: [],
        },
        cta: {
            type: String,
            required: [true, "CTA is required"],
            trim: true,
        },
        highlighted: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

// Avoid stale schema during Next.js hot reload (missing billingType field)
if (mongoose.models.PricingPlan) {
    delete mongoose.models.PricingPlan
}

export default mongoose.model("PricingPlan", PricingPlanSchema)
