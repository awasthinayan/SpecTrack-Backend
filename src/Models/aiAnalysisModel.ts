import mongoose, { Schema, Document } from "mongoose";

export interface IAIAnalysis extends Document {
  requirementId: mongoose.Types.ObjectId;
  missingPoints: string[];
  risks: string[];
  suggestedTasks: string[];
}

const aiAnalysisSchema = new Schema<IAIAnalysis>(
  {
    requirementId: {
      type: Schema.Types.ObjectId,
      ref: "Requirement",
      required: true,
    },
    missingPoints: [{ type: String }],
    risks: [{ type: String }],
    suggestedTasks: [{ type: String }],
  },
  { timestamps: true },
);

export const AIAnalysisModel = mongoose.model<IAIAnalysis>(
  "AIAnalysis",
  aiAnalysisSchema,
);
