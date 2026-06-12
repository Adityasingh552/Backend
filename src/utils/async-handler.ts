import type { Request, Response, NextFunction } from "express";
import type { AsyncRequestHandler } from "../types/index.js";

/**
 * Wraps an async Express route handler to automatically catch errors
 * and forward them to the next error-handling middleware.
 */
export const asyncHandler = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
