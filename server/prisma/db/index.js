const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

const sessionStore = new PrismaSessionStore(
    new PrismaClient(),
    {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdSessionId: true,
        dbRecordIdFunction: undefined
    }
);

module.exports = sessionStore;