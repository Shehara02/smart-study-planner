// Database configuration file
// This file exports the Prisma client for use throughout the application

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
