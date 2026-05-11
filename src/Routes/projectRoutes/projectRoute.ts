import { Hono } from "hono";
import {
  CreateProjectController,
  UpdateProjectByIdController,
  DeleteProjectByIdController,
  ListProjectsController,
  GetProjectByIdController,
} from "../../Controller/projectController";
import { createProjectSchema, updateProjectSchema } from "../../Validation/projectValidation";
import { zodMiddleware } from "../../Middleware/zodMiddleware";
import { authMiddleware } from "../../Middleware/authMiddleware";

const projectRouter = new Hono();

projectRouter.post(
  "/create",
  authMiddleware,
  zodMiddleware(createProjectSchema),
  CreateProjectController,
);

projectRouter.get("/", authMiddleware, ListProjectsController);

projectRouter.get("/:id", authMiddleware, GetProjectByIdController);

projectRouter.put("/:id", authMiddleware, zodMiddleware(updateProjectSchema), UpdateProjectByIdController);

projectRouter.delete("/:id", authMiddleware, DeleteProjectByIdController);

export default projectRouter;
