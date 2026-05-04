import { Hono } from "hono";
import {
  CreateTaskController,
  GetTaskByIdController,
  GetTasksByProjectIdController,
  UpdateTaskByIdController,
  DeleteTaskByIdController,
  UpdateTaskStatusController,
} from "../../Controller/taskController";
import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
} from "../../Validation/taskValidation";
import { zodMiddleware } from "../../Middleware/zodMiddleware";
import { authMiddleware } from "../../Middleware/authMiddleware";

const taskRouter = new Hono();

taskRouter.post(
  "/create",
  authMiddleware,
  zodMiddleware(createTaskSchema),
  CreateTaskController
);

taskRouter.get("/project/:projectId", authMiddleware, GetTasksByProjectIdController);

taskRouter.get("/:id", authMiddleware, GetTaskByIdController);

taskRouter.put("/:id", authMiddleware, zodMiddleware(updateTaskSchema), UpdateTaskByIdController);

taskRouter.patch("/:id/status", authMiddleware, zodMiddleware(updateTaskStatusSchema), UpdateTaskStatusController);

taskRouter.delete("/:id", authMiddleware, DeleteTaskByIdController);

export default taskRouter;
