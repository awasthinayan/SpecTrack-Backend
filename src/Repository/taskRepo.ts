import { TaskModel } from "../Models/taskModel";
import { getSafeObjectIdFromParam } from "../Utils/safeIdValidation";

export class TaskRepository {
 async CreateTask(task: any) {
 const newTask = new TaskModel(task);
 return await newTask.save();
 }

 async GetTaskById(id: string) {
 const safeId = getSafeObjectIdFromParam(id);
 return await TaskModel.findById(safeId);
 }

 async DeleteTaskById(id: string) {
 const safeId = getSafeObjectIdFromParam(id);
 return await TaskModel.findByIdAndDelete(safeId);
 }

 async UpdateTaskById(id: string, task: any) {
 const safeId = getSafeObjectIdFromParam(id);
 return await TaskModel.findByIdAndUpdate(safeId, task, { new: true });
 }

 async GetTasksByProjectId(projectId: string) {
 const safeProjectId = getSafeObjectIdFromParam(projectId);
 return await TaskModel.find({ projectId: safeProjectId });
 }

 async UpdateTaskStatus(id: string, status: string) {
 const safeId = getSafeObjectIdFromParam(id);
 return await TaskModel.findByIdAndUpdate(safeId, { status }, { new: true });
 }
}

export default TaskRepository;