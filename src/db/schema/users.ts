import { mysqlTable, text, int, real, index } from 'drizzle-orm/mysql-core';
import { uuidBinary, uuidv7 } from '@/db/uuid';
import { auditFields } from './shared/types';

export const users = mysqlTable('users', {
  id: uuidBinary("id").notNull().primaryKey().$defaultFn(uuidv7),
      ...auditFields,
},
  (table) => [
    index("idx_accounts_deleted_at").on(table.deletedAt),
  ]);
