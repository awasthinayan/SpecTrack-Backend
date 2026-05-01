import RequirementRepository from "../Repository/requirementRepo";
import ProjectRepository from "../Repository/projectRepo";
import UserRepository from "../Repository/userRepo";

const requirementRepo = new RequirementRepository();
const projectRepo = new ProjectRepository();
const userRepo = new UserRepository();

export const CreateRequirementService = async (
  projectId: string,
  content: string,
  userId: string,
) => {
  try {
    const existingRequirement =
      await requirementRepo.GetRequirementById(projectId);
    if (existingRequirement) {
      throw new Error("A requirement with this project ID already exists");
    }

    const project = await projectRepo.GetProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const user = await userRepo.GetUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user._id.toString() !== project.userId.toString()) {
      throw new Error(
        "You are not authorized to create a requirement for this project",
      );
    }

    const newRequirement = await requirementRepo.CreateRequirement({
      projectId: project._id,
      content,
    });

    return {
      success: true,
      message: "Requirement created successfully",
      data: newRequirement,
    };
  } catch (error) {
    throw new Error("Failed to create requirement");
  }
};

export const DeleteRequirementByIdService = async (
  id: string,
  userId: string,
) => {
  try {
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

    if (user._id.toString() !== project.userId.toString()) {
      throw new Error("You are not authorized to delete this requirement");
    }

    await requirementRepo.DeleteRequirementById(id);

    return {
      success: true,
      message: "Requirement deleted successfully",
    };
  } catch (error) {
    throw new Error("Failed to delete requirement");
  }
};

export const UpdateRequirementByIdService = async (
  id: string,
  requirementData: any,
  userId: string,
) => {
  try {
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

    if (user._id.toString() !== project.userId.toString()) {
      throw new Error("You are not authorized to update this requirement");
    }

    if (
      requirementData.content &&
      requirementData.content !== existingRequirement.content
    ) {
      throw new Error("Requirement content cannot be updated");
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
    throw new Error("Failed to update requirement");
  }
};

export const ListRequirementsService = async (
  projectId: string,
  userId: string,
) => {
  try {
    const project = await projectRepo.GetProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const user = await userRepo.GetUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user._id.toString() !== project.userId.toString()) {
      throw new Error(
        "You are not authorized to view this project's requirements",
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
    throw new Error("Failed to retrieve requirements");
  }
};

export const GetRequirementByIdService = async (
  id: string,
  userId: string,
  projectId: string,
) => {
  try {
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

    if (user._id.toString() !== project.userId.toString()) {
      throw new Error("You are not authorized to view this requirement");
    }
    return {
      success: true,
      message: "Requirement retrieved successfully",
      data: requirement,
    };
  } catch (error) {
    throw new Error("Failed to retrieve requirement");
  }
};
