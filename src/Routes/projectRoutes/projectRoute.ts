import { Hono } from "hono";
import { CreateProjectController, UpdateProjectByIdController, DeleteProjectByIdController } from "../../Controller/projectController";
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

projectRouter.delete("/:id", authMiddleware, DeleteProjectByIdController);

projectRouter.put("/:id", authMiddleware, zodMiddleware(updateProjectSchema), UpdateProjectByIdController);
export default projectRouter;
