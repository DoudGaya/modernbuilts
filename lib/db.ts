import { PrismaClient } from '@prisma/client' // import prisma client
declare global { // declare a typescript global variable to be prismaClient or undefined 
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient(); // call the declared 
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
