import ws from 'ws';
import { PrismaClient } from '@prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

// Prisma can load the datasource URL from prisma.config.js or the environment.
// Keep a singleton in development to avoid exhausting database connections.
let prisma;

if (!process.env.DATABASE_URL) {
	console.warn('lib/prisma.js: WARNING - DATABASE_URL is not set');
} else {
	console.info('lib/prisma.js: DATABASE_URL detected');
}

try {
	neonConfig.webSocketConstructor = ws;
	const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
	prisma = global.prisma || new PrismaClient({ adapter });
	if (process.env.NODE_ENV === 'development') global.prisma = prisma;
} catch (err) {
	console.error('lib/prisma.js: error creating Prisma client', err);
	throw err;
}

export default prisma;