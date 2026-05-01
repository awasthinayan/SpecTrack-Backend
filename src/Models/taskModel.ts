import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
}

const taskSchema = new Schema<ITask>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
  },
  { timestamps: true },
);

export const TaskModel = mongoose.model<ITask>("Task", taskSchema);
