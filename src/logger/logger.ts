import winston from "winston";
import { env } from "../config/env.config.js";

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : "";
    const stackString = stack ? `\n${stack}` : "";
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${metaString}${stackString}`;
  })
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), logFormat),
  }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    format: logFormat,
  }),
  new winston.transports.File({
    filename: "logs/combined.log",
    format: logFormat,
  }),
];

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: env.NODE_ENV === "production" ? "info" : "debug",
      format: logFormat,
      transports,
      exitOnError: false,
    });
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(message, meta);
  }

  /**
   * Returns a writable stream for Morgan HTTP logger integration.
   */
  get stream() {
    return {
      write: (message: string) => {
        this.logger.info(message.trim());
      },
    };
  }
}

export const logger = new Logger();
