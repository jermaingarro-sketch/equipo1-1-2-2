import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
    type: String,
    default: "" // Cambia null por string vacío si prefieres
  },

    date: {
        type: Date,
        default: Date.now,
    },

    user: {
        // type: mongoose.Schema.Types.ObjectId,
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

export default mongoose.model("Task", taskSchema);