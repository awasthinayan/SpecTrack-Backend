import type { Context } from "hono";
import {
  analyzeRequirement,
  getAiAnalysisForRequirement,
  getAiInsightsForProject
} from "../Services/aiAnalysisService";

export const AnalyzeRequirementController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const requirementId = c.req.param("id");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401
      );
    }

    if (!requirementId) {
      return c.json(
        {
          success: false,
          message: "Invalid requirement ID",
        },
        400
      );
    }

    const result = await analyzeRequirement(requirementId);
    return c.json(result, result.success ? 200 : 400);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to analyze requirement",
      },
      400
    );
  }
};

export const GetAiAnalysisForRequirementController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const requirementId = c.req.param("id");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401
      );
    }

    if (!requirementId) {
      return c.json(
        {
          success: false,
          message: "Invalid requirement ID",
        },
        400
      );
    }

    const result = await getAiAnalysisForRequirement(requirementId);
    return c.json(result, result.success ? 200 : 400);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to retrieve AI analysis",
      },
      400
    );
  }
};

export const GetAiInsightsForProjectController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const projectId = c.req.param("id");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401
      );
    }

    if (!projectId) {
      return c.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        400
      );
    }

    const result = await getAiInsightsForProject(projectId);
    return c.json(result, result.success ? 200 : 400);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to retrieve AI insights",
      },
      400
    );
  }
};