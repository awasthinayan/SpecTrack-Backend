import { Hono } from "hono";
import authRouter from "./userRoutes/authRoutes";
import projectRouter from "./projectRoutes/projectRoute";
import requirementRouter from "./requirementRoutes/requirementRoutes";
import taskRouter from "./taskRoutes/taskRoutes";

const router = new Hono();

router.route("/user/auth", authRouter);

router.route("/project", projectRouter);

router.route("/requirement", requirementRouter);

router.route("/task", taskRouter);

export default router;
