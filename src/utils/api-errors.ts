import type { HttpStatusCode } from "../constants/index.js";

export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly errors: unknown[];
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: HttpStatusCode,
    errors: unknown[] = [],
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", errors: unknown[] = []) {
    super(message, 400, errors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", errors: unknown[] = []) {
    super(message, 401, errors);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden", errors: unknown[] = []) {
    super(message, 403, errors);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", errors: unknown[] = []) {
    super(message, 404, errors);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict", errors: unknown[] = []) {
    super(message, 409, errors);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", errors: unknown[] = []) {
    super(message, 422, errors);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal server error", errors: unknown[] = []) {
    super(message, 500, errors, false);
  }
}
