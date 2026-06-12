import { env } from "./config/env.config.js";
import { connectDatabase } from "./config/database.js";
import { app } from "./app.js";
import { logger } from "./logger/logger.js";

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Start HTTP server
    app.listen(env.PORT, () => {
      logger.info(`🚀 Server is running on port ${env.PORT}`);
      logger.info(`📦 Environment: ${env.NODE_ENV}`);
      logger.info(`❤️  Health check: http://localhost:${env.PORT}/health`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server", { error });
    process.exit(1);
  }
};

startServer();
