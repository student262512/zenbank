import { mysqlTable, text, int, real } from 'drizzle-orm/mysql-core';
import { uuidBinary, uuidv7 } from '@/db/uuid';
import { auditFields } from './shared/types';

export const projects = mysqlTable('projects', {
  id: uuidBinary("id").notNull().primaryKey().$defaultFn(uuidv7),
      ...auditFields,
});
