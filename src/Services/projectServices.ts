import ProjectRepository from "../Repository/projectRepo";
import UserRepository from "../Repository/userRepo";

const projectRepo = new ProjectRepository();
const userRepo = new UserRepository();

export const CreateProjectService = async (
  name: string,
  description: string,
  userId: string,
) => {
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
    userId: user._id,
  });

  return {
    success: true,
    message: "Project created successfully",
    data: newProject,
  };
};

export const DeleteProjectByIdService = async (id: string, userId: string) => {
  const project = await projectRepo.GetProjectById(id);
  if (!project) {
    throw new Error("Project not found");
  }

  const user = await userRepo.GetUserById(project.userId.toString());
  if (!user) {
    throw new Error("User not found. Please login again");
  }

  if (user._id.toString() !== project.userId.toString()) {
    throw new Error("You are not authorized to delete this project");
  }

  await projectRepo.DeleteProjectById(id);

  return {
    success: true,
    message: "Project deleted successfully",
  };
};

export const UpdateProjectByIdService = async (
  id: string,
  projectData: any,
) => {
  const existingProject = await projectRepo.GetProjectById(id);
  if (!existingProject) {
    throw new Error("Project not found");
  }

  const user = await userRepo.GetUserById(existingProject.userId.toString());
  if (!user) {
    throw new Error("User not found. Please login again");
  }

  if (user._id.toString() !== existingProject.userId.toString()) {
    throw new Error("You are not authorized to update this project");
  }

  if (projectData.name && projectData.name !== existingProject.name) {
    const nameExists = await projectRepo.GetProjectByName(projectData.name);
    if (nameExists) {
      throw new Error("A project with this name already exists");
    }
  }

  const updatedProject = await projectRepo.UpdateProjectById(id, projectData);

  console.log("updated project", updatedProject);
  return {
    success: true,
    message: "Project updated successfully",
    data: updatedProject,
  };
};

export const ListProjectsService = async (userId: string) => {
  const user = await userRepo.GetUserById(userId);
  if (!user) {
    throw new Error("User not found. Please login again");
  }

  const projects = await projectRepo.GetProjectsByUserId(userId);

  return {
    success: true,
    message: "Projects retrieved successfully",
    data: projects,
    count: projects.length,
  };
};

export const GetProjectByIdService = async (id: string, userId: string) => {
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
};
