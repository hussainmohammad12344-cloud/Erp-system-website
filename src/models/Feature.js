import mongoose from "mongoose"

const FeatureSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        icon: {
            type: String,
            required: [true, "Icon is required"],
            trim: true,
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

export default mongoose.models.Feature || mongoose.model("Feature", FeatureSchema)
