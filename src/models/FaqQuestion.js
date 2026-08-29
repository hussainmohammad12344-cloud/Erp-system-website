import mongoose from "mongoose"

const FaqQuestionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        question: {
            type: String,
            required: [true, "Question is required"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["new", "answered", "archived"],
            default: "new",
        },
    },
    { timestamps: true }
)

export default mongoose.models.FaqQuestion ||
    mongoose.model("FaqQuestion", FaqQuestionSchema)
