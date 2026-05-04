import { TaskRepository } from "../Repository/taskRepo";

const taskRepo = new TaskRepository();

export const CreateTaskService = async (
  projectId: string,
  title: string,
  description?: string,
  status: string = "todo"
) => {
  try {
    const task = await taskRepo.CreateTask({
      projectId,
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
    return {
      success: false,
      message: error.message || "Failed to create task",
    };
  }
};

export const GetTaskByIdService = async (taskId: string) => {
  try {
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
    return {
      success: false,
      message: error.message || "Failed to retrieve task",
    };
  }
};

export const GetTasksByProjectIdService = async (projectId: string) => {
  try {
    const tasks = await taskRepo.GetTasksByProjectId(projectId);

    return {
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    };
  } catch (error: any) {
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
    return {
      success: false,
      message: error.message || "Failed to update task",
    };
  }
};

export const DeleteTaskByIdService = async (taskId: string) => {
  try {
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
    return {
      success: false,
      message: error.message || "Failed to update task status",
    };
  }
};
