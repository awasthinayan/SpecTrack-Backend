import { Hono } from "hono";
import { authMiddleware } from "../../Middleware/authMiddleware";
import { zodMiddleware } from "../../Middleware/zodMiddleware";
import { createRequirementSchema, updateRequirementSchema } from "../../Validation/requirementValidation";
import {
  CreateRequirementController,
  DeleteRequirementByIdController,
  GetRequirementByIdController,
  ListRequirementsController,
  UpdateRequirementByIdController,
} from "../../Controller/requirementController";

const requirementRouter = new Hono();

requirementRouter.use(authMiddleware);

requirementRouter.post(
  "/projects/:projectId/requirements",
  zodMiddleware(createRequirementSchema),
  CreateRequirementController
);

requirementRouter.get(
  "/projects/:projectId/requirements",
  ListRequirementsController
);

requirementRouter.get(
  "/projects/:projectId/requirements/:id",
  GetRequirementByIdController
);

requirementRouter.put(
  "/projects/:projectId/requirements/:id",
  zodMiddleware(updateRequirementSchema),
  UpdateRequirementByIdController
);

requirementRouter.delete(
  "/projects/:projectId/requirements/:id",
  DeleteRequirementByIdController
);

export default requirementRouter;