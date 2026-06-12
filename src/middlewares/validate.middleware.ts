import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";
import { ValidationError } from "../utils/index.js";
import { logger } from "../logger/logger.js";

type ZodSchema = z.ZodType<unknown>;

interface ValidationTarget {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

/**
 * Middleware factory that validates request body, query, and/or params
 * against the provided Zod schemas. Throws ValidationError on failure.
 */
export const validate = (schemas: ValidationTarget) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const errors: unknown[] = [];

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        errors.push(
          ...result.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          }))
        );
      } else {
        req.body = result.data;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        errors.push(
          ...result.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          }))
        );
      } else {
        (req as Request).query = result.data as typeof req.query;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        errors.push(
          ...result.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          }))
        );
      } else {
        req.params = result.data as typeof req.params;
      }
    }

    if (errors.length > 0) {
      logger.warn("Validation failed", { errors });
      throw new ValidationError("Validation failed", errors);
    }

    next();
  };
};
