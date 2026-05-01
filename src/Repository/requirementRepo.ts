import { Requirement } from "../Models/requirementModel";

export class RequirementRepository {
    async CreateRequirement(requirement: any) {
        const newRequirement = new Requirement(requirement);
        return await newRequirement.save();
    }

    async GetRequirementById(id: string) {
        return await Requirement.findById(id);
    }

    async GetRequirementsByProjectId(projectId: string) {
        return await Requirement.find({ projectId: projectId });
    }

    async DeleteRequirementById(id: string) {
        return await Requirement.findByIdAndDelete(id);
    }

    async UpdateRequirementById(id: string, requirement: any) {
        return await Requirement.findByIdAndUpdate(id, requirement, { new: true });
    }
}

export default RequirementRepository;