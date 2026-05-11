import { AIAnalysisModel } from "../Models/aiAnalysisModel";
import { Requirement } from "../Models/requirementModel";
import { getSafeObjectIdFromParam } from "../Utils/safeIdValidation";

export class AIAnalysisRepository {
  async CreateAIAnalysis(analysis: any) {
    const newAnalysis = new AIAnalysisModel(analysis);
    return await newAnalysis.save();
  }

  async GetAIAnalysisByRequirementId(requirementId: string) {
    const safeRequirementId = getSafeObjectIdFromParam(requirementId);
    return await AIAnalysisModel.findOne({ requirementId: safeRequirementId });
  }

  async UpdateAIAnalysisById(id: string, analysis: any) {
    const safeId = getSafeObjectIdFromParam(id);
    return await AIAnalysisModel.findByIdAndUpdate(safeId, analysis, { new: true });
  }

  async DeleteAIAnalysisById(id: string) {
    const safeId = getSafeObjectIdFromParam(id);
    return await AIAnalysisModel.findByIdAndDelete(safeId);
  }

  async GetAIAnalysesByProjectId(projectId: string) {
    const safeProjectId = getSafeObjectIdFromParam(projectId);
    // Query requirements directly — avoids circular import via require()
    const requirements = await Requirement.find({ projectId: safeProjectId }).select("_id");
    const requirementIds = requirements.map((r) => r._id);
    return await AIAnalysisModel.find({ requirementId: { $in: requirementIds } });
  }
}

export default AIAnalysisRepository;