import mongoose from "mongoose";

const TaskModel = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true }, // Ensure it's a Date type
    status: { type: Boolean, default: false },
  });

const Tasks = mongoose.models.TaskSchema || mongoose.model("TaskSchema",TaskModel);

export default Tasks;