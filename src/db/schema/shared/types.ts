import { sql } from 'drizzle-orm';
import { timestamp, varchar, int, smallint, boolean, text, decimal, json, mysqlTable, unique } from 'drizzle-orm/mysql-core';
import { customType } from "drizzle-orm/mysql-core";
// import { dataRegions } from '@/db/schema/regions';
import { uuidBinary, uuidv7 } from '@/db/uuid';
import { datetimeUtc } from './datetimeUtc';


export const char = (name: string, length: number) =>
  customType<{data: string, driverData: string}>({
    dataType() {
      return `char(${length})`;
    },
    toDriver(value: string) {
      return value;
    },
    fromDriver(value: string) {
      return value;
    }
  })(name);

export function createLookupTables(baseName: string) {
  const tableName = `${baseName}`;
  const translationName = `${baseName}_translations`;

  const base = mysqlTable(tableName, {
    id: uuidBinary("id").notNull().primaryKey().$defaultFn(uuidv7),
    code: varchar("code", { length: 64 }).unique().notNull(),
    // createdAt: datetime("created_at").defaultNow(),
  });
  
  const translation = mysqlTable(translationName, {
    id: uuidBinary("id").notNull().primaryKey().$defaultFn(uuidv7),
    [`${baseName}Id`]: uuidBinary(`${baseName}_id`).notNull()
      .references(() => base.id, { onDelete: 'restrict' }),
    locale: varchar("locale", { length: 10 }).notNull(),
    label: varchar("label", { length: 128 }).notNull(),
  }, (table) => [
    // Provide a short custom name for the unique constraint here:
    unique(`${translationName}_unique`).on(table[`${baseName}Id`], table.locale), 
    // unique(`${baseName}_${translationName}_unique`).on(table[`${baseName}Id`], table.locale), 
  ]);


  return { base, translation };
}

export const auditFieldsWithoutRegion = {
  createdAt: datetimeUtc('created_at').notNull().default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetimeUtc('updated_at').notNull().default(sql`CURRENT_TIMESTAMP(3)`).onUpdateNow(),
  updatedBy: uuidBinary("updated_by").notNull(),
//   updatedBy: uuidBinary("updated_by").notNull().references(() => users.id, { onDelete: 'restrict' }),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  deletedAt: datetimeUtc('deleted_at'),
  version: int("version").notNull().default(1),
  tenant_id: int("tenant_id", { unsigned: true }),
};

// export const auditFields = {
//   createdAt: datetimeUtc('created_at').notNull().default(sql`CURRENT_TIMESTAMP(3)`),
//   updatedAt: datetimeUtc('updated_at').notNull().default(sql`CURRENT_TIMESTAMP(3)`).onUpdateNow(),
//   updatedBy: uuidBinary("updated_by").notNull(),
// //   updatedBy: uuidBinary("updated_by").notNull().references(() => actors.id, { onDelete: 'restrict' }),
//   isDeleted: boolean('is_deleted').default(false).notNull(),
//   deletedAt: datetimeUtc('deleted_at'),
//   version: int("version").notNull().default(1),
//   region_id: smallint("region_id", { unsigned: true })
//         .notNull()
//         .references(() => dataRegions.id, { onDelete: "restrict" }),
//   tenant_id: int("tenant_id", { unsigned: true }),
// };
