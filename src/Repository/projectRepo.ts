import { Project } from "../Models/projectModel";
import { getSafeObjectIdFromParam } from "../Utils/safeIdValidation";

export class ProjectRepository {
 async CreateProject(project: any) {
 const newProject = new Project(project);
 return await newProject.save();
 }

 async GetProjectById(id: string) {
 const safeId = getSafeObjectIdFromParam(id);
 return await Project.findById(safeId);
 }

 async GetProjectByName(name: string) {
 return await Project.findOne({ name });
 }

 async DeleteProjectById(id: string) {
 const safeId = getSafeObjectIdFromParam(id);
 return await Project.findByIdAndDelete(safeId);
 }

 async UpdateProjectById(id: string, project: any) {
 const safeId = getSafeObjectIdFromParam(id);
 return await Project.findByIdAndUpdate(safeId, project, { new: true });
 }

 async GetProjectsByUserId(userId: string) {
 const safeUserId = getSafeObjectIdFromParam(userId);
 return await Project.find({ userId: safeUserId });
 }
}

export default ProjectRepository;