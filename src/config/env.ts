/**
 * Environment variables validation
 * Validates and type-checks environment variables at runtime
 */

import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Better Auth
  BETTER_AUTH_SECRET: z.string().min(32, 'BETTER_AUTH_SECRET must be at least 32 characters'),
  BETTER_AUTH_URL: z.string().url('BETTER_AUTH_URL must be a valid URL'),

  // AI Providers
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),

  // Application URLs
  NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
  NEXT_PUBLIC_APP_NAME: z.string().default('ZenReal'),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),

  // Email Service (Optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),

  // Cloud Storage (Optional)
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),

  // Analytics (Optional)
  NEXT_PUBLIC_GA_ID: z.string().optional(),

  // Error Tracking (Optional)
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  NEXT_PUBLIC_ENABLE_ERROR_TRACKING: z
    .string()
    .transform((val) => val === 'true')
    .optional(),

  // Redis (Optional - for caching and sessions)
  REDIS_URL: z.string().url().optional(),

  // Rate Limiting
  RATE_LIMIT_MAX: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
});

// Validate and parse environment variables
function validateEnv() {
  try {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
      console.error('❌ Invalid environment variables:');
      console.error(JSON.stringify(parsed.error.format(), null, 2));
      throw new Error('Invalid environment variables');
    }

    return parsed.data;
  } catch (error) {
    console.error('Failed to validate environment variables:', error);
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Type for environment variables
export type Env = z.infer<typeof envSchema>;

// Helper to check if we're in development
export const isDev = env.NODE_ENV === 'development';

// Helper to check if we're in production
export const isProd = env.NODE_ENV === 'production';

// Helper to check if we're in test
export const isTest = env.NODE_ENV === 'test';

// Helper to check if AI providers are configured
export const hasOpenAI = !!env.OPENAI_API_KEY;
export const hasAnthropic = !!env.ANTHROPIC_API_KEY;

// Helper to check if email is configured
export const hasEmailConfig = !!(
  env.SMTP_HOST &&
  env.SMTP_PORT &&
  env.SMTP_USER &&
  env.SMTP_PASSWORD
);

// Helper to check if cloud storage is configured
export const hasCloudStorage = !!(
  env.AWS_ACCESS_KEY_ID &&
  env.AWS_SECRET_ACCESS_KEY &&
  env.AWS_REGION &&
  env.AWS_S3_BUCKET
);

// Helper to check if analytics is enabled
export const hasAnalytics = !!(
  env.NEXT_PUBLIC_ENABLE_ANALYTICS &&
  env.NEXT_PUBLIC_GA_ID
);

// Helper to check if error tracking is enabled
export const hasErrorTracking = !!(
  env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING &&
  env.SENTRY_DSN
);

// Export all helpers
export const envHelpers = {
  isDev,
  isProd,
  isTest,
  hasOpenAI,
  hasAnthropic,
  hasEmailConfig,
  hasCloudStorage,
  hasAnalytics,
  hasErrorTracking,
};
