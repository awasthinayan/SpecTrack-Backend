import { Hono } from "hono";
import { GetUserSettingsController, UpdateUserSettingsController } from "../../Controller/userSettingsController";
import { authMiddleware } from "../../Middleware/authMiddleware";

const userSettingsRouter = new Hono();

// Get user settings
userSettingsRouter.get("/", authMiddleware, GetUserSettingsController);

// Update user settings
userSettingsRouter.put("/", authMiddleware, UpdateUserSettingsController);

export default userSettingsRouter;