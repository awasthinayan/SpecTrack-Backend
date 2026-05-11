import ProjectRepository from "../Repository/projectRepo";
import { getSafeObjectIdFromParam } from "../Utils/safeIdValidation";

const projectRepo = new ProjectRepository();

export const CreateProjectService = async (
  name: string,
  description: string,
  userId: string,
) => {
  try {
    // Validate ID
    const safeUserId = getSafeObjectIdFromParam(userId);

    const existingProject = await projectRepo.GetProjectByName(name);
    if (existingProject) {
      throw new Error("A project with this name already exists");
    }

    const user = await userRepo.GetUserById(userId);
    if (!user) {
      throw new Error("User not found. Please login again");
    }

    const newProject = await projectRepo.CreateProject({
      name,
      description,
      userId: safeUserId,
    });

    return {
      success: true,
      message: "Project created successfully",
      data: newProject,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid user ID format");
    }
    throw error;
  }
};

export const DeleteProjectByIdService = async (id: string, userId: string) => {
  try {
    // Validate IDs
    getSafeObjectIdFromParam(id);
    getSafeObjectIdFromParam(userId);

    const project = await projectRepo.GetProjectById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    if (userId !== project.userId.toString()) {
      throw new Error("You are not authorized to delete this project");
    }

    await projectRepo.DeleteProjectById(id);

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid project ID or user ID format");
    }
    throw error;
  }
};

export const UpdateProjectByIdService = async (
  id: string,
  projectData: any,
) => {
  try {
    // Validate ID
    getSafeObjectIdFromParam(id);

    const existingProject = await projectRepo.GetProjectById(id);
    if (!existingProject) {
      throw new Error("Project not found");
    }

    if (projectData.name && projectData.name !== existingProject.name) {
      const nameExists = await projectRepo.GetProjectByName(projectData.name);
      if (nameExists) {
        throw new Error("A project with this name already exists");
      }
    }

    const updatedProject = await projectRepo.UpdateProjectById(id, projectData);

    return {
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid project ID format");
    }
    throw error;
  }
};

export const ListProjectsService = async (userId: string) => {
  try {
    // Validate ID
    getSafeObjectIdFromParam(userId);

    const projects = await projectRepo.GetProjectsByUserId(userId);

    return {
      success: true,
      message: "Projects retrieved successfully",
      data: projects,
      count: projects.length,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid user ID format");
    }
    throw error;
  }
};

export const GetProjectByIdService = async (id: string, userId: string) => {
  try {
    // Validate IDs
    getSafeObjectIdFromParam(id);
    getSafeObjectIdFromParam(userId);

    const project = await projectRepo.GetProjectById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId.toString() !== userId) {
      throw new Error("You are not authorized to view this project");
    }

    return {
      success: true,
      message: "Project retrieved successfully",
      data: project,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid project ID or user ID format");
    }
    throw error;
  }
};
