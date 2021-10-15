import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  description: String,
  status: String
});

const Task = mongoose.model("tasks", taskSchema);
export default Task;