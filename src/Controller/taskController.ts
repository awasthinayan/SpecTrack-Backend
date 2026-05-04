import type { Context } from "hono";
import {
  CreateTaskService,
  GetTaskByIdService,
  GetTasksByProjectIdService,
  UpdateTaskByIdService,
  DeleteTaskByIdService,
  UpdateTaskStatusService,
} from "../Services/taskServices";

export const CreateTaskController = async (c: Context) => {
  try {
    const data = c.get("validatedData");

    if (!data) {
      return c.json(
        {
          success: false,
          message: "Invalid request body",
        },
        400
      );
    }

    const result = await CreateTaskService(
      data.projectId,
      data.title,
      data.description,
      data.status
    );

    return c.json(result, 201);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to create task",
      },
      400
    );
  }
};

export const GetTaskByIdController = async (c: Context) => {
  try {
    const taskId = c.req.param("id");

    if (!taskId) {
      return c.json(
        {
          success: false,
          message: "Invalid task ID",
        },
        400
      );
    }

    const result = await GetTaskByIdService(taskId);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to retrieve task",
      },
      400
    );
  }
};

export const GetTasksByProjectIdController = async (c: Context) => {
  try {
    const projectId = c.req.param("projectId");

    if (!projectId) {
      return c.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        400
      );
    }

    const result = await GetTasksByProjectIdService(projectId);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to retrieve tasks",
      },
      400
    );
  }
};

export const UpdateTaskByIdController = async (c: Context) => {
  try {
    const taskId = c.req.param("id");
    const data = c.get("validatedData");

    if (!taskId) {
      return c.json(
        {
          success: false,
          message: "Invalid task ID",
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

    const result = await UpdateTaskByIdService(taskId, data);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to update task",
      },
      400
    );
  }
};

export const DeleteTaskByIdController = async (c: Context) => {
  try {
    const taskId = c.req.param("id");

    if (!taskId) {
      return c.json(
        {
          success: false,
          message: "Invalid task ID",
        },
        400
      );
    }

    const result = await DeleteTaskByIdService(taskId);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to delete task",
      },
      400
    );
  }
};

export const UpdateTaskStatusController = async (c: Context) => {
  try {
    const taskId = c.req.param("id");
    const data = c.get("validatedData");

    if (!taskId) {
      return c.json(
        {
          success: false,
          message: "Invalid task ID",
        },
        400
      );
    }

    if (!data || !data.status) {
      return c.json(
        {
          success: false,
          message: "Status is required",
        },
        400
      );
    }

    const result = await UpdateTaskStatusService(taskId, data.status);
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message || "Failed to update task status",
      },
      400
    );
  }
};
