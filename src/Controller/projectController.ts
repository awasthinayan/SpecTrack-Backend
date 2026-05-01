import type { Context } from "hono";
import {
  CreateProjectService,
  DeleteProjectByIdService,
  UpdateProjectByIdService,
  ListProjectsService,
  GetProjectByIdService,
} from "../Services/projectServices";

export const CreateProjectController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const data = c.get("validatedData");

    if (!data) {
      return c.json(
        { 
          success: false,
          message: "Invalid request body" 
        },
        400
      );
    }

    if (!userId) {
      return c.json(
        { 
          success: false,
          message: "Unauthorized: User ID not found" 
        },
        401
      );
    }

    const result = await CreateProjectService(
      data.name,
      data.description,
      userId
    );

    return c.json(result, 201);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to create project",
      },
      400
    );
  }
};

export const ListProjectsController = async (c: Context) => {
  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: User ID not found",
        },
        401
      );
    }

    const result = await ListProjectsService(userId);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to retrieve projects",
      },
      400
    );
  }
};

export const GetProjectByIdController = async (c: Context) => {
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

    const result = await GetProjectByIdService(projectId, userId);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to retrieve project",
      },
      400
    );
  }
};

export const UpdateProjectByIdController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const projectId = c.req.param("id");
    const data = c.get("validatedData");

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

    if (!data) {
      return c.json(
        {
          success: false,
          message: "Invalid request body",
        },
        400
      );
    }

    const result = await UpdateProjectByIdService(projectId, data);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to update project",
      },
      400
    );
  }
};

export const DeleteProjectByIdController = async (c: Context) => {
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

    const result = await DeleteProjectByIdService(projectId, userId);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to delete project",
      },
      400
    );
  }
};