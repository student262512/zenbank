import { sql } from 'drizzle-orm';
import { timestamp, varchar, int, smallint, boolean, text, decimal, json } from 'drizzle-orm/mysql-core';
import { datetimeUtc } from "./datetimeUtc";
import { uuidBinary } from '@/db/uuid';
import { dataRegions } from '@/db/schema/regions';

export const auditFields = {
  createdAt: datetimeUtc('created_at').notNull().default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetimeUtc('updated_at').notNull().default(sql`CURRENT_TIMESTAMP(3)`).onUpdateNow(),
  updatedBy: uuidBinary("updated_by").notNull(),
//   updatedBy: uuidBinary("updated_by").notNull().references(() => actors.id, { onDelete: 'restrict' }),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  deletedAt: datetimeUtc('deleted_at'),
  version: int("version").notNull().default(1),
  region_id: smallint("region_id", { unsigned: true })
        .notNull()
        .references(() => dataRegions.id, { onDelete: "restrict" }),
  tenant_id: int("tenant_id", { unsigned: true }),
};
