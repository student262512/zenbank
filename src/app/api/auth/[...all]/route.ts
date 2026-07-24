/**
 * Better Auth API route handler
 * Handles all authentication requests
 */

import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

// Export Better Auth handlers for Next.js
export const { GET, POST } = toNextJsHandler(auth);
