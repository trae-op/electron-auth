import { dialog } from "electron";
import { databaseService } from "../shared/databaseService.js";
import { User } from "@prisma/client";
import { logger } from "../shared/logger.js";

export async function createUser({
  email,
  name,
  picture = "",
  provider,
}: TPartialUser): Promise<User | undefined> {
  try {
    const client = databaseService.client;

    return await client.user.create({
      data: {
        email,
        name,
        picture,
        provider,
      },
    });
  } catch (error) {
    logger.error("Error creating user in database:", error);
    throw new Error(
      `Failed to create user in database: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export function getUser(
  where: Partial<User>
): Promise<User | null> | undefined {
  try {
    const client = databaseService.client;
    return client.user.findFirst({
      where,
    });
  } catch (error) {
    logger.error("Error getting user in database:", error);
    throw new Error(
      `Failed to get user: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
