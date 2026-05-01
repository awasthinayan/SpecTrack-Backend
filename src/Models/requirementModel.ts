import mongoose, { Schema, Document } from "mongoose";

export interface IRequirement extends Document {
  projectId: mongoose.Types.ObjectId;
  content: string;
}

const requirementSchema = new Schema<IRequirement>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

export const RequirementModel = mongoose.model<IRequirement>(
  "Requirement",
  requirementSchema,
);
