import { TaskRepository } from "../Repository/taskRepo";
import { getSafeObjectIdFromParam } from "../Utils/safeIdValidation";

const taskRepo = new TaskRepository();

export const CreateTaskService = async (
  projectId: string,
  title: string,
  description?: string,
  status: string = "todo"
) => {
  try {
    // Validate ID
    const safeProjectId = getSafeObjectIdFromParam(projectId);

    const task = await taskRepo.CreateTask({
      projectId: safeProjectId,
      title,
      description,
      status,
    });

    return {
      success: true,
      message: "Task created successfully",
      data: task,
    };
  } catch (error: any) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      return {
        success: false,
        message: "Invalid project ID format",
      };
    }
    return {
      success: false,
      message: error.message || "Failed to create task",
    };
  }
};

export const GetTaskByIdService = async (taskId: string) => {
  try {
    // Validate ID
    const safeTaskId = getSafeObjectIdFromParam(taskId);

    const task = await taskRepo.GetTaskById(taskId);

    if (!task) {
      return {
        success: false,
        message: "Task not found",
      };
    }

    return {
      success: true,
      message: "Task retrieved successfully",
      data: task,
    };
  } catch (error: any) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      return {
        success: false,
        message: "Invalid task ID format",
      };
    }
    return {
      success: false,
      message: error.message || "Failed to retrieve task",
    };
  }
};

export const GetTasksByProjectIdService = async (projectId: string) => {
  try {
    // Validate ID
    const safeProjectId = getSafeObjectIdFromParam(projectId);

    const tasks = await taskRepo.GetTasksByProjectId(projectId);

    return {
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    };
  } catch (error: any) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      return {
        success: false,
        message: "Invalid project ID format",
      };
    }
    return {
      success: false,
      message: error.message || "Failed to retrieve tasks",
    };
  }
};

export const UpdateTaskByIdService = async (
  taskId: string,
  updates: any
) => {
  try {
    // Validate ID
    const safeTaskId = getSafeObjectIdFromParam(taskId);

    const task = await taskRepo.UpdateTaskById(taskId, updates);

    if (!task) {
      return {
        success: false,
        message: "Task not found",
      };
    }

    return {
      success: true,
      message: "Task updated successfully",
      data: task,
    };
  } catch (error: any) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      return {
        success: false,
        message: "Invalid task ID format",
      };
    }
    return {
      success: false,
      message: error.message || "Failed to update task",
    };
  }
};

export const DeleteTaskByIdService = async (taskId: string) => {
  try {
    // Validate ID
    const safeTaskId = getSafeObjectIdFromParam(taskId);

    const task = await taskRepo.DeleteTaskById(taskId);

    if (!task) {
      return {
        success: false,
        message: "Task not found",
      };
    }

    return {
      success: true,
      message: "Task deleted successfully",
    };
  } catch (error: any) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      return {
        success: false,
        message: "Invalid task ID format",
      };
    }
    return {
      success: false,
      message: error.message || "Failed to delete task",
    };
  }
};

export const UpdateTaskStatusService = async (
  taskId: string,
  status: string
) => {
  try {
    // Validate ID
    const safeTaskId = getSafeObjectIdFromParam(taskId);

    const task = await taskRepo.UpdateTaskStatus(taskId, status);

    if (!task) {
      return {
        success: false,
        message: "Task not found",
      };
    }

    return {
      success: true,
      message: "Task status updated successfully",
      data: task,
    };
  } catch (error: any) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      return {
        success: false,
        message: "Invalid task ID format",
      };
    }
    return {
      success: false,
      message: error.message || "Failed to update task status",
    };
  }
};
