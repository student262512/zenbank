import { drizzle } from 'drizzle-orm/tidb-serverless';
import { getConnection } from '@/db/connection';
import * as shared from '@/db/schema';

// Initialize Drizzle ORM with TiDB Serverless
const connection = getConnection();

export const db = drizzle(connection, {
  schema: {
    ...shared,
  },
});

// Export all schemas
export * from '@/db/schema';

// Type for the database instance
export type Database = typeof db;


// import { drizzle } from 'drizzle-orm/libsql';
// import { createClient } from '@libsql/client';

// const client = createClient({
//   url: process.env.DATABASE_URL!,
//   authToken: process.env.DATABASE_AUTH_TOKEN,
// });

// export const db = drizzle(client);
