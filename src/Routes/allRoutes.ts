import { Hono } from "hono";
import authRouter from "./userRoutes/authRoutes";
import projectRouter from "./projectRoutes/projectRoute";

const router = new Hono();

router.route("/user/auth", authRouter);

router.route("/project", projectRouter);

export default router;
