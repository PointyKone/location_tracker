import { PrismaClient } from "@prisma/client";

import { config } from "dotenv";

config();
const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export { prisma };