import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User" }

})

export default mongoose.model('Task', TaskSchema)