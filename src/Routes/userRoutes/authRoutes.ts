import { Hono } from "hono";
import {
  LoginUserController,
  RegiterUserController,
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

export default authRouter;
