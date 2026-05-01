import { z } from "zod";

export const createRequirementSchema = z.object({
  content: z
    .string()
    .min(10, "Requirement must be at least 10 characters")
    .max(5000, "Requirement must not exceed 5000 characters"),
});

export const updateRequirementSchema = z.object({
  content: z
    .string()
    .min(10, "Requirement must be at least 10 characters")
    .max(5000, "Requirement must not exceed 5000 characters")
    .optional(),
});
