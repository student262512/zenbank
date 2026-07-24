import { mysqlTable, text, int, real } from 'drizzle-orm/mysql-core';
import { uuidBinary, uuidv7 } from '@/db/uuid';
import { auditFields } from './shared/types';

export const escrow_accounts = mysqlTable('escrow_accounts', {
  id: uuidBinary("id").notNull().primaryKey().$defaultFn(uuidv7),
      ...auditFields,
});
