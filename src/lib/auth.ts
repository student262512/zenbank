/**
 * Better Auth configuration
 * https://www.better-auth.com/docs
 */

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { env } from '@/config/env';

export const auth = betterAuth({
  // Database adapter
  database: drizzleAdapter(db, {
    provider: 'mysql',
  }),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      // TODO: Implement email sending
      console.log('Password reset email:', { user: user.email, url });
    },
    sendVerificationEmail: async ({ user, url }) => {
      // TODO: Implement email sending
      console.log('Verification email:', { user: user.email, url });
    },
  },

  // Social authentication
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      enabled: !!process.env.GOOGLE_CLIENT_ID,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      enabled: !!process.env.GITHUB_CLIENT_ID,
    },
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  // Account configuration
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
    },
  },

  // User management
  user: {
    deleteUser: {
      enabled: true,
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }) => {
        // TODO: Implement email sending
        console.log('Email change verification:', { newEmail, url });
      },
    },
    changePassword: {
      enabled: true,
    },
  },

  // Advanced options
  advanced: {
    useSecureCookies: env.NODE_ENV === 'production',
    cookieDomain: env.NODE_ENV === 'production' ? '.zenreal.ai' : undefined,
    crossSubDomainCookies: {
      enabled: env.NODE_ENV === 'production',
    },
    generateId: () => {
      // Use UUID v7 for time-ordered IDs
      const { generateId } = require('@/db/helpers');
      return generateId();
    },
  },

  // Trust host (required for production)
  trustedOrigins: [
    env.BETTER_AUTH_URL,
    env.NEXT_PUBLIC_APP_URL,
  ],

  // Base URL
  baseURL: env.BETTER_AUTH_URL,
  basePath: '/api/auth',

  // Secret for signing cookies and tokens
  secret: env.BETTER_AUTH_SECRET,

  // Rate limiting
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 10, // 10 requests per minute
    storage: 'memory', // TODO: Use Redis in production
  },

  // Callbacks
  callbacks: {
    async signIn({ user, account }) {
      // Custom sign-in logic
      console.log('User signed in:', user.email);
      return true;
    },
    async signUp({ user }) {
      // Custom sign-up logic
      console.log('User signed up:', user.email);
      // TODO: Send welcome email
      return true;
    },
  },

  // Plugins can be added here
  plugins: [],
});

// Export auth types
export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;


// import { betterAuth } from 'better-auth';
// import { drizzleAdapter } from 'better-auth/adapters/drizzle';
// import { db } from '@/db';

// export const auth = betterAuth({
//   database: drizzleAdapter(db, { provider: 'mysql' }),
// });

