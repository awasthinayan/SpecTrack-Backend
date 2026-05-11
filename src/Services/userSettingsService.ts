import { UserSettingsRepository } from "../Repository/userSettingsRepo";
import type { IUserSettings } from "../Models/userSettingsModel";

// Frontend-facing settings shape
interface FrontendSettings {
  theme?: 'light' | 'dark';
  notifications?: {
    email?: boolean;
    push?: boolean;
    projectUpdates?: boolean;
    requirementChanges?: boolean;
    taskAssignments?: boolean;
  };
}

const userSettingsRepo = new UserSettingsRepository();

// Convert frontend settings shape to the backend DB shape
const toBackendSettings = (settings: FrontendSettings): Partial<IUserSettings> => {
  const backend: Partial<IUserSettings> = {};

  if (settings.theme !== undefined) {
    backend.theme = settings.theme;
  }

  if (settings.notifications) {
    const n = settings.notifications;
    if (n.email !== undefined) backend.emailNotifications = n.email;
    if (n.push !== undefined) backend.pushNotifications = n.push;
    if (n.projectUpdates !== undefined) backend.projectUpdates = n.projectUpdates;
    if (n.requirementChanges !== undefined) backend.requirementChanges = n.requirementChanges;
    if (n.taskAssignments !== undefined) backend.taskAssignments = n.taskAssignments;
  }

  return backend;
};

export const GetUserSettingsService = async (userId: string) => {
  const settings = await userSettingsRepo.getUserSettingsByUserId(userId);
  if (!settings) {
    // Return default settings in frontend expected format if none exist yet
    return {
      theme: 'light',
      notifications: {
        email: true,
        push: true,
        projectUpdates: true,
        requirementChanges: true,
        taskAssignments: true
      }
    };
  }

  // Transform backend format to frontend format
  return {
    theme: settings.theme,
    notifications: {
      email: settings.emailNotifications,
      push: settings.pushNotifications,
      projectUpdates: settings.projectUpdates,
      requirementChanges: settings.requirementChanges,
      taskAssignments: settings.taskAssignments
    }
  };
};

export const UpdateUserSettingsService = async (userId: string, settings: FrontendSettings) => {
  const backendSettings = toBackendSettings(settings);
  const existingSettings = await userSettingsRepo.getUserSettingsByUserId(userId);

  if (existingSettings) {
    return await userSettingsRepo.updateUserSettings(userId, backendSettings);
  } else {
    return await userSettingsRepo.createUserSettings(userId, backendSettings);
  }
};