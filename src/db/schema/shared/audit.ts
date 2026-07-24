import { sql } from 'drizzle-orm';
import { timestamp, varchar, int, smallint, boolean, text, decimal, json } from 'drizzle-orm/mysql-core';
import { datetimeUtc } from "./datetimeUtc";
import { uuidBinary } from '@/db/uuid';

// export const datetimeUtc = (name: string) => 
//   timestamp(name, { mode: 'date', fsp: 3 })
//     .default(sql`CURRENT_TIMESTAMP(3)`)
//     .onUpdateNow();

export const auditFieldsWithoutRegion = () => ({
  createdAt: datetimeUtc('created_at').notNull().default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetimeUtc('updated_at').notNull().default(sql`CURRENT_TIMESTAMP(3)`).onUpdateNow(),
  updatedBy: uuidBinary('updated_by').notNull(),
  // updatedBy: uuidBinary("updated_by").notNull(),
//   updatedBy: uuidBinary("updated_by").notNull().references(() => actors.id, { onDelete: 'restrict' }),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  deletedAt: datetimeUtc('deleted_at'),
  version: int("version").notNull().default(1),
  tenant_id: int("tenant_id", { unsigned: true }),
});