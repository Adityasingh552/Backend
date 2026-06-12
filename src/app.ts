import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { logger } from "./logger/logger.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";
import { productRoutes } from "./app/products/products.routes.js";
import { ApiSuccessResponse } from "./utils/index.js";
import { HttpStatus } from "./constants/index.js";

const app = express();

// --------------- Middlewares ---------------
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined", { stream: logger.stream }));

// --------------- Routes ---------------

// Health check
app.get("/health", (_req, res) => {
  new ApiSuccessResponse("Server is healthy", {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }).send(res, HttpStatus.OK);
});

// API routes
app.use("/api/v1/products", productRoutes);

// --------------- Error Handling ---------------
app.use(errorHandlerMiddleware);

export { app };
