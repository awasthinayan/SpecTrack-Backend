import { Hono } from "hono";
import {
  LoginUserController,
  RegiterUserController,
  RequestPasswordResetController,
  ValidatePasswordResetTokenController,
  ResetPasswordController,
  getCurrentUserController,
  LogoutUserController,
} from "../../Controller/userController";
import { zodMiddleware } from "../../Middleware/zodMiddleware";
import { loginSchema, registerSchema } from "../../Validation/authValidation";

const authRouter = new Hono();

authRouter.post(
  "/register",
  zodMiddleware(registerSchema),
  RegiterUserController,
);
authRouter.post("/login", zodMiddleware(loginSchema), LoginUserController);

authRouter.get("/", getCurrentUserController);

authRouter.post("/logout", LogoutUserController);

// Password reset routes
authRouter.post("/forgot-password", RequestPasswordResetController);
authRouter.get(
  "/reset-password/validate/:userId/:token",
  ValidatePasswordResetTokenController,
);
authRouter.post("/reset-password/:userId/:token", ResetPasswordController);

export default authRouter;
