import { Hono } from "hono";
import { authMiddleware } from "../Middleware/authMiddleware";
import {
  AnalyzeRequirementController,
  GetAiAnalysisForRequirementController,
  GetAiInsightsForProjectController
} from "../Controller/aiAnalysisController";

const aiAnalysisRouter = new Hono();

// Apply authentication middleware to all AI routes
aiAnalysisRouter.use("/*", authMiddleware);

// Analyze a requirement
aiAnalysisRouter.post("/requirements/:id/analyze", AnalyzeRequirementController);

// Get AI analysis for a specific requirement
aiAnalysisRouter.get("/requirements/:id/ai-analysis", GetAiAnalysisForRequirementController);

// Get aggregated AI insights for a project
aiAnalysisRouter.get("/projects/:id/ai-insights", GetAiInsightsForProjectController);

export default aiAnalysisRouter;