import { PrismaClient } from '@prisma/client' // import prisma client
declare global { // declare a typescript global variable to be prismaClient or undefined 
    var prisma: PrismaClient | undefined;
}

export const getDatabaseConfigurationError = () => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        return "DATABASE_URL is missing.";
    }

    try {
        const url = new URL(databaseUrl);

        if (!["postgresql:", "postgres:"].includes(url.protocol)) {
            return "DATABASE_URL must be a PostgreSQL connection string.";
        }

        if (url.hostname.includes("mongodb.net")) {
            return "DATABASE_URL still points to MongoDB. Replace it with the Neon PostgreSQL connection string.";
        }
    } catch {
        return "DATABASE_URL is not a valid URL.";
    }

    return null;
}

const databaseConfigurationError = getDatabaseConfigurationError();
if (databaseConfigurationError && process.env.NODE_ENV !== "production") {
    console.error(databaseConfigurationError);
}

export const db = globalThis.prisma || new PrismaClient(); // call the declared 
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
