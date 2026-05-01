import type { Context } from "hono";
import {
  CreateRequirementService,
  DeleteRequirementByIdService,
  UpdateRequirementByIdService,
  ListRequirementsService,
  GetRequirementByIdService,
} from "../Services/requirementService";

export const CreateRequirementController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const data = c.get("validatedData");
    const projectId = c.req.param("projectId");

    if (!data) {
      return c.json(
        {
          success: false,
          message: "Please provide a valid request",
        },
        400,
      );
    }

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401,
      );
    }

    if (!projectId) {
      return c.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        400,
      );
    }

    const result = await CreateRequirementService(
      projectId,
      data.content,
      userId,
    );

    return c.json(result, 201);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to create requirement",
      },
      400,
    );
  }
};

export const ListRequirementsController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const projectId = c.req.param("projectId");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401,
      );
    }

    if (!projectId) {
      return c.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        400,
      );
    }

    const result = await ListRequirementsService(projectId, userId);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to retrieve requirements",
      },
      400,
    );
  }
};

export const GetRequirementByIdController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const requirementId = c.req.param("id");
    const projectId = c.req.param("projectId");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401,
      );
    }

    if (!requirementId) {
      return c.json(
        {
          success: false,
          message: "Invalid requirement ID",
        },
        400,
      );
    }

    if (!projectId) {
      return c.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        400,
      );
    }

    const result = await GetRequirementByIdService(
      requirementId,
      userId,
      projectId,
    );
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to retrieve requirement",
      },
      400,
    );
  }
};

export const UpdateRequirementByIdController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const requirementId = c.req.param("id");
    const data = c.get("validatedData");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401,
      );
    }

    if (!requirementId) {
      return c.json(
        {
          success: false,
          message: "Invalid requirement ID",
        },
        400,
      );
    }

    if (!data) {
      return c.json(
        {
          success: false,
          message: "Please provide a valid request",
        },
        400,
      );
    }

    const result = await UpdateRequirementByIdService(
      userId,
      requirementId,
      data,
    );
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to update requirement",
      },
      400,
    );
  }
};

export const DeleteRequirementByIdController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const requirementId = c.req.param("id");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401,
      );
    }

    if (!requirementId) {
      return c.json(
        {
          success: false,
          message: "Invalid requirement ID",
        },
        400,
      );
    }

    const result = await DeleteRequirementByIdService(requirementId, userId);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to delete requirement",
      },
      400,
    );
  }
};
