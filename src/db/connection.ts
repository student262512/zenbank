import { connect } from '@tidbcloud/serverless';

// TiDB Serverless connection
export const getConnection = () => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  return connect({ url });
};

// Connection pool configuration
export const connectionConfig = {
  url: process.env.DATABASE_URL,
  // TiDB Serverless automatically handles connection pooling
  // No additional configuration needed
};

// Test connection helper
export async function testConnection() {
  try {
    const conn = getConnection();
    const result = await conn.execute('SELECT 1 as test');
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
