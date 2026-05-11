import { Types } from 'mongoose';

/**
 * Validates that a string is a valid MongoDB ObjectId
 * @param id - The string to validate
 * @returns boolean - True if valid ObjectId, false otherwise
 */
export const isValidObjectId = (id: string): boolean => {
  if (!id || typeof id !== 'string') {
    return false;
  }

  // MongoDB ObjectId is 24-character hex string
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
};

/**
 * Safely converts a string to MongoDB ObjectId or throws error if invalid
 * @param id - The string to convert
 * @returns Types.ObjectId - Valid ObjectId
 * @throws Error if id is not a valid ObjectId
 */
export const safeParseObjectId = (id: string): Types.ObjectId => {
  if (!isValidObjectId(id)) {
    throw new Error('Invalid ObjectId format');
  }

  return new Types.ObjectId(id);
};

/**
 * Safe helper for getting ObjectId from request parameters
 * @param idParam - The parameter value from request
 * @returns Types.ObjectId - Valid ObjectId
 * @throws Error if id is not a valid ObjectId
 */
export const getSafeObjectIdFromParam = (idParam: unknown): Types.ObjectId => {
  if (typeof idParam !== 'string') {
    throw new Error('ID must be a string');
  }

  return safeParseObjectId(idParam);
};