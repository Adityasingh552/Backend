import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./env.config.js";
import { logger } from "../logger/logger.js";

const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle(queryClient);

export const connectDatabase = async (): Promise<void> => {
  try {
    await queryClient`SELECT 1`;
    logger.info("✅ Database connected successfully");
  } catch (error) {
    logger.error("❌ Database connection failed", { error });
    process.exit(1);
  }
};
