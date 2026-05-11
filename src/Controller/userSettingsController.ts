import type { Context } from "hono";
import { GetUserSettingsService, UpdateUserSettingsService } from "../Services/userSettingsService";

export const GetUserSettingsController = async (c: Context) => {
  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401
      );
    }

    const settings = await GetUserSettingsService(userId);
    return c.json({ success: true, data: settings }, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to retrieve user settings",
      },
      400
    );
  }
};

export const UpdateUserSettingsController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const data = await c.req.json();

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401
      );
    }

    if (!data) {
      return c.json(
        {
          success: false,
          message: "Invalid request body",
        },
        400
      );
    }

    const updatedSettings = await UpdateUserSettingsService(userId, data);
    return c.json({ success: true, data: updatedSettings }, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to update user settings",
      },
      400
    );
  }
};