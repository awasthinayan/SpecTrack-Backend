import mongoose, { Document, Schema } from "mongoose";

export interface IUserSettings extends Document {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  projectUpdates: boolean;
  requirementChanges: boolean;
  taskAssignments: boolean;
  theme: 'light' | 'dark';
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSettingsSchema: Schema<IUserSettings> = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
    projectUpdates: {
      type: Boolean,
      default: true,
    },
    requirementChanges: {
      type: Boolean,
      default: true,
    },
    taskAssignments: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  {
    timestamps: true,
  }
);

export const UserSettings = mongoose.model<IUserSettings>("UserSettings", userSettingsSchema);