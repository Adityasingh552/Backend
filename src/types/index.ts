import type { Request, Response, NextFunction } from "express";

/**
 * Common API success response shape.
 */
export interface IApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

/**
 * Common API error response shape.
 */
export interface IApiErrorResponse {
  success: false;
  message: string;
  errors: unknown[];
}

/**
 * Generic async request handler type.
 */
export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
