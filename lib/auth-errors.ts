import { getDatabaseConfigurationError } from "@/lib/db";

export const databaseUnavailableMessage =
    "We couldn't connect to the database. Please check the MongoDB DATABASE_URL and try again.";

export const getAuthActionErrorMessage = (
    error: unknown,
    fallback = "Something went wrong. Please try again.",
) => {
    if (getDatabaseConfigurationError()) {
        return databaseUnavailableMessage;
    }

    if (error instanceof Error) {
        const message = error.message.toLowerCase();

        if (
            message.includes("database connection") ||
            message.includes("dns resolution") ||
            message.includes("server selection timeout") ||
            message.includes("can't reach database server") ||
            message.includes("p1001")
        ) {
            return databaseUnavailableMessage;
        }
    }

    return fallback;
}
