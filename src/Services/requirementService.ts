import RequirementRepository from "../Repository/requirementRepo";
import ProjectRepository from "../Repository/projectRepo";
import UserRepository from "../Repository/userRepo";
import { getSafeObjectIdFromParam } from "../Utils/safeIdValidation";

const requirementRepo = new RequirementRepository();
const projectRepo = new ProjectRepository();
const userRepo = new UserRepository();

export const CreateRequirementService = async (
  projectId: string,
  content: string,
  userId: string,
) => {
  try {
    // Validate IDs
    const safeProjectId = getSafeObjectIdFromParam(projectId);
    getSafeObjectIdFromParam(userId); // validate userId format

    const project = await projectRepo.GetProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const user = await userRepo.GetUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (userId !== project.userId.toString()) {
      throw new Error(
        "You are not authorized to create a requirement for this project"
      );
    }

    const newRequirement = await requirementRepo.CreateRequirement({
      projectId: safeProjectId,
      content,
    });

    return {
      success: true,
      message: "Requirement created successfully",
      data: newRequirement,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid project ID or user ID format");
    }
    throw error;
  }
};

export const DeleteRequirementByIdService = async (
  id: string,
  userId: string,
) => {
  try {
    // Validate IDs
    getSafeObjectIdFromParam(id);
    getSafeObjectIdFromParam(userId);

    const requirement = await requirementRepo.GetRequirementById(id);
    if (!requirement) {
      throw new Error("Requirement not found");
    }

    const project = await projectRepo.GetProjectById(
      requirement.projectId.toString(),
    );
    if (!project) {
      throw new Error("Project not found");
    }

    const user = await userRepo.GetUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (userId !== project.userId.toString()) {
      throw new Error("You are not authorized to delete this requirement");
    }

    await requirementRepo.DeleteRequirementById(id);

    return {
      success: true,
      message: "Requirement deleted successfully",
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid requirement ID or user ID format");
    }
    throw error;
  }
};

export const UpdateRequirementByIdService = async (
  id: string,
  requirementData: any,
  userId: string,
) => {
  try {
    // Validate IDs
    getSafeObjectIdFromParam(id);
    getSafeObjectIdFromParam(userId);

    const existingRequirement = await requirementRepo.GetRequirementById(id);
    if (!existingRequirement) {
      throw new Error("Requirement not found");
    }

    const project = await projectRepo.GetProjectById(
      existingRequirement.projectId.toString(),
    );

    if (!project) {
      throw new Error("Project not found");
    }

    const user = await userRepo.GetUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (userId !== project.userId.toString()) {
      throw new Error("You are not authorized to update this requirement");
    }

    const updatedRequirement = await requirementRepo.UpdateRequirementById(
      id,
      requirementData,
    );

    return {
      success: true,
      message: "Requirement updated successfully",
      data: updatedRequirement,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid requirement ID or user ID format");
    }
    throw error;
  }
};

export const ListRequirementsService = async (
  projectId: string,
  userId: string,
) => {
  try {
    // Validate IDs
    getSafeObjectIdFromParam(projectId);
    getSafeObjectIdFromParam(userId);

    const project = await projectRepo.GetProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const user = await userRepo.GetUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (userId !== project.userId.toString()) {
      throw new Error(
        "You are not authorized to view this project's requirements"
      );
    }

    const requirements =
      await requirementRepo.GetRequirementsByProjectId(projectId);

    return {
      success: true,
      message: "Requirements retrieved successfully",
      data: requirements,
      count: requirements.length,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid project ID or user ID format");
    }
    throw error;
  }
};

export const GetRequirementByIdService = async (
  id: string,
  userId: string,
  projectId: string,
) => {
  try {
    // Validate IDs
    getSafeObjectIdFromParam(id);
    getSafeObjectIdFromParam(userId);
    getSafeObjectIdFromParam(projectId);

    const requirement = await requirementRepo.GetRequirementById(id);
    if (!requirement) {
      throw new Error("Requirement not found");
    }

    const project = await projectRepo.GetProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const user = await userRepo.GetUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (userId !== project.userId.toString()) {
      throw new Error("You are not authorized to view this requirement");
    }
    return {
      success: true,
      message: "Requirement retrieved successfully",
      data: requirement,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid ObjectId format') {
      throw new Error("Invalid requirement ID, user ID, or project ID format");
    }
    throw error;
  }
};