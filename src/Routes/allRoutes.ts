import { Hono } from "hono";
import authRouter from "./userRoutes/authRoutes";
import projectRouter from "./projectRoutes/projectRoute";
import requirementRouter from "./requirementRoutes/requirementRoutes";
import taskRouter from "./taskRoutes/taskRoutes";
import aiAnalysisRouter from "./aiAnalysisRoutes";
import userSettingsRouter from "./userSettingsRoutes/userSettingsRoute";

const router = new Hono();

router.route("/user/auth", authRouter);
router.route("/user/settings", userSettingsRouter);

router.route("/project", projectRouter);

router.route("/requirement", requirementRouter);

router.route("/task", taskRouter);

// AI analysis routes
router.route("/ai", aiAnalysisRouter);

export default router;
