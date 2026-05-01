import { Hono } from "hono";
import authRouter from "./userRoutes/authRoutes";

const router = new Hono();

router.route("/user/auth",authRouter);

export default router;
