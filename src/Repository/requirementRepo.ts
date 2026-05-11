import { Requirement } from "../Models/requirementModel";
import { getSafeObjectIdFromParam } from "../Utils/safeIdValidation";

export class RequirementRepository {
 async CreateRequirement(requirement: any) {
 const newRequirement = new Requirement(requirement);
 return await newRequirement.save();
 }

 async GetRequirementById(id: string) {
 const safeId = getSafeObjectIdFromParam(id);
 return await Requirement.findById(safeId);
 }

 async GetRequirementsByProjectId(projectId: string) {
 const safeProjectId = getSafeObjectIdFromParam(projectId);
 return await Requirement.find({ projectId: safeProjectId });
 }

 async DeleteRequirementById(id: string) {
 const safeId = getSafeObjectIdFromParam(id);
 return await Requirement.findByIdAndDelete(safeId);
 }

 async UpdateRequirementById(id: string, requirement: any) {
 const safeId = getSafeObjectIdFromParam(id);
 return await Requirement.findByIdAndUpdate(safeId, requirement, { new: true });
 }
}

export default RequirementRepository;