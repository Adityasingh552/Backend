import type { Response } from "express";
import type { HttpStatusCode } from "../constants/index.js";
import type { IApiSuccessResponse, IApiErrorResponse } from "../types/index.js";

export class ApiSuccessResponse<T = unknown> {
  public readonly success = true as const;
  public readonly message: string;
  public readonly data: T;

  constructor(message: string, data: T) {
    this.message = message;
    this.data = data;
  }

  send(res: Response, statusCode: HttpStatusCode = 200): Response {
    const body: IApiSuccessResponse<T> = {
      success: this.success,
      message: this.message,
      data: this.data,
    };
    return res.status(statusCode).json(body);
  }
}

export class ApiErrorResponse {
  public readonly success = false as const;
  public readonly message: string;
  public readonly errors: unknown[];

  constructor(message: string, errors: unknown[] = []) {
    this.message = message;
    this.errors = errors;
  }

  send(res: Response, statusCode: HttpStatusCode = 500): Response {
    const body: IApiErrorResponse = {
      success: this.success,
      message: this.message,
      errors: this.errors,
    };
    return res.status(statusCode).json(body);
  }
}
