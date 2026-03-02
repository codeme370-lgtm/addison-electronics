import 'dotenv/config';
import prisma from '../lib/prisma.js';

async function showColumnsFor(namePattern) {
  try {
    const result = await prisma.$queryRaw`
      SELECT table_schema, table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_name ILIKE ${namePattern}
      ORDER BY table_schema, table_name, ordinal_position;
    `;
    console.log(`\ncolumns for pattern ${namePattern}:`, JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('query error for', namePattern, err);
  }
}

try {
  // Check common troublesome names (case differences between Prisma and Postgres)
  await showColumnsFor('order');
  await showColumnsFor('"Order"');
  await showColumnsFor('addresschangealert');
  await showColumnsFor('"AddressChangeAlert"');
} finally {
  await prisma.$disconnect();
}
