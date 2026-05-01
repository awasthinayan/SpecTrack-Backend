import { Project } from "../Models/projectModel";

export class ProjectRepository {
  async CreateProject(project: any) {
    const newProject = new Project(project);
    return await newProject.save();
  }

  async GetProjectById(id: string) {
    return await Project.findById(id);
  }

  async GetProjectByName(name: string) {
    return await Project.findOne({ name });
  }

  async DeleteProjectById(id: string) {
    return await Project.findByIdAndDelete(id);
  }

  async UpdateProjectById(id: string, project: any) {
    return await Project.findByIdAndUpdate(id, project, { new: true });
  }

  async GetProjectsByUserId(userId: string) {
    return await Project.find({ userId: userId });
  }
}

export default ProjectRepository;
