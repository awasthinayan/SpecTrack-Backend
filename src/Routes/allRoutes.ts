import { Hono } from "hono";
import authRouter from "./userRoutes/authRoutes";
import projectRouter from "./projectRoutes/projectRoute";
import requirementRouter from "./requirementRoutes/requirementRoutes";

const router = new Hono();

router.route("/user/auth", authRouter);

router.route("/project", projectRouter);

router.route("/requirement", requirementRouter);

export default router;
