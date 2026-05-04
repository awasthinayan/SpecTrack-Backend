import { TaskModel } from "../Models/taskModel";

export class TaskRepository {
  async CreateTask(task: any) {
    const newTask = new TaskModel(task);
    return await newTask.save();
  }

  async GetTaskById(id: string) {
    return await TaskModel.findById(id);
  }

  async DeleteTaskById(id: string) {
    return await TaskModel.findByIdAndDelete(id);
  }

  async UpdateTaskById(id: string, task: any) {
    return await TaskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async GetTasksByProjectId(projectId: string) {
    return await TaskModel.find({ projectId });
  }

  async UpdateTaskStatus(id: string, status: string) {
    return await TaskModel.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export default TaskRepository;
