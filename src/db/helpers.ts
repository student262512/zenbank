import { uuidv7, uuidBinary } from './uuid';

// Generate time-ordered UUID v7
export function generateId(binary: boolean = true): string {
  // if (binary) {
  //   return uuidBinary();
  // }
  return uuidv7();
}

// Database error handlers
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Common query helpers
export const pagination = {
  getOffset: (page: number, limit: number) => {
    return (page - 1) * limit;
  },

  getPaginationParams: (page: number = 1, limit: number = 10) => {
    return {
      limit,
      offset: (page - 1) * limit,
    };
  },

  getPaginationMeta: (total: number, page: number, limit: number) => {
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  },
};

// Date helpers for database queries
export const dateHelpers = {
  startOfDay: (date: Date = new Date()) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  endOfDay: (date: Date = new Date()) => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  },

  startOfMonth: (date: Date = new Date()) => {
    const d = new Date(date);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  endOfMonth: (date: Date = new Date()) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    d.setHours(23, 59, 59, 999);
    return d;
  },

  daysAgo: (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d;
  },

  monthsAgo: (months: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() - months);
    return d;
  },
};

// Transaction wrapper
export async function withTransaction<T>(
  db: any,
  callback: (tx: any) => Promise<T>
): Promise<T> {
  try {
    return await db.transaction(callback);
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(
        'Transaction failed',
        'TRANSACTION_ERROR',
        error.message
      );
    }
    throw error;
  }
}
