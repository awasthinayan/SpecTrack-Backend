import { UserSettings, IUserSettings } from "../Models/userSettingsModel";

export class UserSettingsRepository {
  async getUserSettingsByUserId(userId: string) {
    return UserSettings.findOne({ userId }).exec();
  }

  async createUserSettings(userId: string, settings: Partial<IUserSettings>) {
    return UserSettings.create({
      userId,
      ...settings,
    });
  }

  async updateUserSettings(userId: string, settings: Partial<IUserSettings>) {
    return UserSettings.findOneAndUpdate(
      { userId },
      { ...settings, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).exec();
  }
}