import { AIAnalysisModel } from '../Models/aiAnalysisModel';
import RequirementRepository from '../Repository/requirementRepo';
import AIAnalysisRepository from '../Repository/aiAnalysisRepo';
import { getSafeObjectIdFromParam } from '../Utils/safeIdValidation';

const requirementRepo = new RequirementRepository();
const aiAnalysisRepo = new AIAnalysisRepository();

// Regular expressions for identifying common requirement patterns and risks
const RISK_PATTERNS = [
  // Ambiguous language
  { pattern: /\bshould\b|\bcould\b|\bmight\b|\bwould\b|\bmay\b/i, description: 'Use of ambiguous language like "should" or "could"' },
  { pattern: /\bapproximately\b|\babout\b|\broughly\b/i, description: 'Vague time or quantity estimates' },
  { pattern: /\buser\b.*\bwill\b|\busers\b.*\bcan\b/i, description: 'Unclear user actions or permissions' },

  // Missing edge cases
  { pattern: /\bif\b.*\bthen\b|\bwhen\b.*\bthen\b/i, description: 'Conditional logic without else/exception cases' },
  { pattern: /\berror\b|\bexception\b|\bfailure\b/i, description: 'Error handling mentioned but not fully specified' },

  // Security concerns
  { pattern: /\bsecure\b|\bsafety\b|\bprivacy\b|\bauthenticat\b|\blogin\b/i, description: 'Security features mentioned without specification' },

  // Performance concerns
  { pattern: /\bfast\b|\bquick\b|\bspeed\b|\bresponse\b|\bload\b/i, description: 'Performance requirements without metrics' },

  // Scalability concerns
  { pattern: /\ball\b.*\busers\b|\bany\b.*\buser\b/i, description: 'Unspecified scalability requirements' },
];

// Common missing point patterns
const MISSING_POINT_PATTERNS = [
  { pattern: /\blogin\b/i, description: 'Authentication method not specified (password, OAuth, SSO)' },
  { pattern: /\bpassword\b/i, description: 'Password complexity requirements not specified' },
  { pattern: /\buser.*role/i, description: 'User permissions/access levels not defined' },
  { pattern: /\btime\b.*\btimeout/i, description: 'Session timeout not specified' },
  { pattern: /\berror.*\bmessage/i, description: 'Error handling and user feedback not defined' },
  { pattern: /\bdata.*\bformat/i, description: 'Input/output data format not specified' },
  { pattern: /\blog.*\b/i, description: 'Logging requirements not defined' },
  { pattern: /\bnotification/i, description: 'User notifications not specified' },
  { pattern: /\bintegration.*\b/i, description: 'Integration points with other systems not defined' },
  { pattern: /\bexport.*\b/i, description: 'Export functionality not specified' },
];

// Task suggestion patterns
const SUGGESTED_TASK_PATTERNS = [
  { pattern: /\bshould\b|\bcould\b|\bmight\b|\bwould\b|\bmay\b/i, suggestion: 'Define exact requirements using "must" instead of "should"' },
  { pattern: /\berror\b|\bexception\b|\bfailure\b/i, suggestion: 'Implement comprehensive error handling and user feedback' },
  { pattern: /\bsecurity\b|\bsafety\b|\bprivacy\b|\bauthenticat\b|\blogin\b/i, suggestion: 'Define authentication and authorization requirements' },
  { pattern: /\bfast\b|\bquick\b|\bspeed\b|\bresponse\b|\bload\b/i, suggestion: 'Define performance metrics (e.g., "response time under 2 seconds" for 95% of requests)' },
  { pattern: /\ball\b.*\busers\b|\bany\b.*\buser\b/i, suggestion: 'Specify scalability expectations (number of concurrent users, data volume)' },
  { pattern: /\bdatabase/i, suggestion: 'Define data storage requirements and retention policies' },
  { pattern: /\bexport/i, suggestion: 'Implement data export functionality with specified formats' },
  { pattern: /\bemail\b|\bnotification/i, suggestion: 'Implement user notification system with configurable options' },
];

// Extract potential missing points based on requirement text
export const extractMissingPoints = (requirementContent: string): string[] => {
  const missingPoints: string[] = [];

  // Check for common missing patterns
  MISSING_POINT_PATTERNS.forEach(pattern => {
    if (pattern.pattern.test(requirementContent)) {
      missingPoints.push(pattern.description);
    }
  });

  // Check for missing acceptance criteria
  if (!/\bacceptance.*criteria/i.test(requirementContent)) {
    missingPoints.push('No clear acceptance criteria defined');
  }

  // Check for ambiguous quantifiers
  if (/\bseveral\b|\bmany\b|\bfew\b|\bsome\b/i.test(requirementContent)) {
    missingPoints.push('Ambiguous quantifiers used without specific numbers');
  }

  // Check for time-based requirements without metrics
  if (/\bsoon\b|\basap\b|\bquickly\b|\bfast\b/i.test(requirementContent) &&
      !/\d+\s*(seconds?|minutes?|hours?|days?)/i.test(requirementContent)) {
    missingPoints.push('Time-based requirements without specific metrics');
  }

  return missingPoints;
};

// Identify risks in requirement text
export const identifyRisks = (requirementContent: string): string[] => {
  const risks: string[] = [];

  // Check for risk patterns
  RISK_PATTERNS.forEach(pattern => {
    if (pattern.pattern.test(requirementContent)) {
      risks.push(pattern.description);
    }
  });

  // Check for vague requirements
  if (requirementContent.length < 20) {
    risks.push('Requirement is too short and likely incomplete');
  }

  // Check for missing scope boundaries
  if (requirementContent.includes('user') && !requirementContent.includes('role') &&
      !requirementContent.includes('permission')) {
    risks.push('User access level or permissions not specified');
  }

  // Check for technical debt indicators
  if (requirementContent.includes('reusable') ||
      requirementContent.includes('template') ||
      requirementContent.includes('module')) {
    risks.push('Potential for technical debt if implementation is not well planned');
  }

  // Check for integration points without details
  if (requirementContent.includes('integrate') &&
      !requirementContent.includes('API') &&
      !requirementContent.includes('schema') &&
      !requirementContent.includes('document')) {
    risks.push('Integration point mentioned but no protocol or format specified');
  }

  return risks;
};

// Generate suggested tasks based on analysis
export const generateSuggestedTasks = (requirementContent: string): string[] => {
  const suggestedTasks: string[] = [];

  // Create tasks based on identified patterns
  SUGGESTED_TASK_PATTERNS.forEach(pattern => {
    if (pattern.pattern.test(requirementContent)) {
      suggestedTasks.push(pattern.suggestion);
    }
  });

  // Add general improvement tasks
  if (requirementContent.length < 50) {
    suggestedTasks.push('Expand requirement with specific acceptance criteria and edge cases');
  }

  if (!/\bacceptance\b.*\bcriteria/i.test(requirementContent)) {
    suggestedTasks.push('Define clear success/failure criteria for this requirement');
  }

  // Add specific tasks based on content
  if (requirementContent.includes('login')) {
    suggestedTasks.push('Define authentication method: password, OAuth, SSO, etc.');
    suggestedTasks.push('Specify password complexity requirements');
    suggestedTasks.push('Implement session timeout functionality');
  }

  if (requirementContent.includes('save') || requirementContent.includes('storage') ||
      requirementContent.includes('database')) {
    suggestedTasks.push('Define data persistence requirements and retention policies');
    suggestedTasks.push('Specify data backup and recovery procedures');
  }

  if (requirementContent.includes('report') || requirementContent.includes('export')) {
    suggestedTasks.push('Define report/export formats (PDF, CSV, Excel)');
    suggestedTasks.push('Implement filtering and sorting options');
  }

  if (requirementContent.includes('user')) {
    suggestedTasks.push('Define user roles and permissions');
    suggestedTasks.push('Implement role-based access control');
  }

  return suggestedTasks;
};

// Main analysis function
export const analyzeRequirement = async (requirementId: string): Promise<any> => {
  try {
    // Get the requirement
    const requirement = await requirementRepo.GetRequirementById(requirementId);
    if (!requirement) {
      throw new Error('Requirement not found');
    }

    const requirementContent = requirement.content || '';

    // Perform all analysis
    const missingPoints = extractMissingPoints(requirementContent);
    const risks = identifyRisks(requirementContent);
    const suggestedTasks = generateSuggestedTasks(requirementContent);

    // Save analysis
    const aiAnalysis = await aiAnalysisRepo.CreateAIAnalysis({
      requirementId,
      missingPoints,
      risks,
      suggestedTasks
    });

    return {
      success: true,
      message: 'Requirement analyzed successfully',
      data: {
        requirementId,
        missingPoints,
        risks,
        suggestedTasks,
        analysisId: aiAnalysis._id
      }
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to analyze requirement'
    };
  }
};

// Get existing analysis for a requirement
export const getAiAnalysisForRequirement = async (requirementId: string) => {
  try {
    const analysis = await aiAnalysisRepo.GetAIAnalysisByRequirementId(requirementId);
    if (!analysis) {
      return {
        success: false,
        message: 'No AI analysis found for this requirement'
      };
    }

    return {
      success: true,
      message: 'AI analysis retrieved successfully',
      data: analysis
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve AI analysis'
    };
  }
};

// Get aggregated AI insights for a project
export const getAiInsightsForProject = async (projectId: string) => {
  try {
    // Get all requirements for the project
    const requirements = await requirementRepo.GetRequirementsByProjectId(projectId);
    if (!requirements || requirements.length === 0) {
      return {
        success: true,
        message: 'No requirements found for this project',
        data: {
          totalRequirements: 0,
          analyzedRequirements: 0,
          totalMissingPoints: 0,
          totalRisks: 0,
          totalSuggestedTasks: 0,
          insights: []
        }
      };
    }

    // Get all AI analyses for these requirements
    const analyses: any[] = [];
    let totalMissingPoints = 0;
    let totalRisks = 0;
    let totalSuggestedTasks = 0;

    for (const req of requirements) {
      const analysis = await aiAnalysisRepo.GetAIAnalysisByRequirementId(req._id.toString());
      if (analysis) {
        analyses.push(analysis);
        totalMissingPoints += analysis.missingPoints.length;
        totalRisks += analysis.risks.length;
        totalSuggestedTasks += analysis.suggestedTasks.length;
      }
    }

    return {
      success: true,
      message: 'AI insights retrieved successfully',
      data: {
        totalRequirements: requirements.length,
        analyzedRequirements: analyses.length,
        totalMissingPoints,
        totalRisks,
        totalSuggestedTasks,
        insights: analyses
      }
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve AI insights'
    };
  }
};