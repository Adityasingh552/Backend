import type { Request, Response, NextFunction } from "express";
import { AppError, ApiErrorResponse } from "../utils/index.js";
import { logger } from "../logger/logger.js";

/**
 * Global error-handling middleware.
 * Catches all errors thrown in route handlers and sends a standardized error response.
 */
export const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(`Error caught in error handler: ${err.message}`, {
    stack: err.stack,
    name: err.name,
  });

  if (err instanceof AppError) {
    const response = new ApiErrorResponse(err.message, err.errors);
    response.send(res, err.statusCode);
    return;
  }

  // Unknown / unhandled errors
  const response = new ApiErrorResponse("Internal server error", []);
  response.send(res, 500);
};
