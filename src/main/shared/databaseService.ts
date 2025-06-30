import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.js";

// Global variable to hold the Prisma Client instance.
// Initialized to null, it will be set once the DatabaseService is instantiated.
let prisma: PrismaClient | null = null;

class DatabaseService {
  constructor() {
    // Ensure that only one PrismaClient instance is created.
    if (!prisma) {
      prisma = new PrismaClient();
      logger.info("DatabaseService: Prisma Client instance created.");
    } else {
      logger.info(
        "DatabaseService: Prisma Client instance already exists, reusing it."
      );
    }
  }

  // Getter for the Prisma Client instance.
  // Throws an error if accessed before initialization, though with the singleton pattern
  // this error should ideally not be hit if `databaseService` is always instantiated.
  public get client(): PrismaClient {
    if (!prisma) {
      const errorMessage =
        "Prisma Client not initialized. Call DatabaseService constructor first.";
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    return prisma;
  }

  // Connects to the PostgreSQL database.
  // This method should only handle the connection logic and throw errors if it fails.
  // Error handling (like showing dialogs) should be done by the caller (e.g., app.ts).
  public async connect(): Promise<void> {
    try {
      if (prisma) {
        await prisma.$connect();
        logger.info(
          "DatabaseService: Successfully connected to the PostgreSQL database."
        );
      } else {
        const errorMessage =
          "DatabaseService: Prisma Client is null, cannot connect.";
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      // Log the error and re-throw it for the calling context to handle.
      const errorMessage = `DatabaseService: Failed to connect to the PostgreSQL database: ${
        error instanceof Error ? error.message : String(error)
      }`;
      logger.error(errorMessage, error); // Log the error object as well
      throw new Error(errorMessage);
    }
  }

  // Disconnects from the PostgreSQL database.
  // Similar to connect(), this method should only handle disconnection and throw errors.
  // Error handling should be managed by the caller.
  public async disconnect(): Promise<void> {
    try {
      if (prisma) {
        await prisma.$disconnect();
        logger.info(
          "DatabaseService: Disconnected from the PostgreSQL database."
        );
        prisma = null; // Optionally set to null after disconnection if you want to allow re-initialization
      } else {
        logger.warn(
          "DatabaseService: Prisma Client is null, no active connection to disconnect."
        );
      }
    } catch (error) {
      // Log the error and re-throw it.
      const errorMessage = `DatabaseService: Failed to disconnect from the PostgreSQL database: ${
        error instanceof Error ? error.message : String(error)
      }`;
      logger.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }
}

// Export a singleton instance of the DatabaseService.
// This instance will be available throughout the main process.
export const databaseService = new DatabaseService();
