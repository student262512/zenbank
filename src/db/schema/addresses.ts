import { sql } from "drizzle-orm";
import { datetimeUtc } from "./shared/datetimeUtc";
import {
  mysqlTable,
  text,
  timestamp,
  varchar,
  int,
  boolean,
  index,
  uniqueIndex,
  mysqlEnum,
  json,
  decimal,
  primaryKey,
} from "drizzle-orm/mysql-core";
import { char } from "./shared/types";
import { users } from "./users";
import { organizations } from "./organizations";
import { createLookupTables } from "./shared/types";
import { uuidBinary, uuidv7 } from "@/db/uuid";

// Countries Table
export const countries = mysqlTable("countries", {
  countryId: int("country_id", { unsigned: true }).primaryKey().autoincrement(),
  countryName: varchar("country_name", { length: 64 }).notNull().unique(),
  countryCodeAlpha2: char("country_code_alpha_2", 2).notNull().unique(),
  countryCodeAlpha3: char("country_code_alpha_3", 3).notNull().unique(),
  countryCodeNumeric3: char("country_code_numeric_3", 3).notNull().unique(),
  countryFlag: varchar("country_flag", { length: 255 }).default(""),
  countryPhoneCode: varchar("country_phone_code", { length: 8 }).default(""),
  countryCurrency: varchar("country_currency", { length: 64 }).default(""),
  countryCurrencyCode: char("country_currency_code", 3).default(""),
  countryCurrencySymbol: varchar("country_currency_symbol", {
    length: 8,
  }).default(""),
  lastModifiedBy: uuidBinary("last_modified_by")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  modifiedDate: datetimeUtc("modified_date")
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`),
});

// States Table
export const states = mysqlTable(
  "states",
  {
    stateId: int("state_id", { unsigned: true }).primaryKey().autoincrement(),
    stateName: varchar("state_name", { length: 64 }).notNull(),
    countryId: int("country_id", { unsigned: true })
      .notNull()
      .references(() => countries.countryId),
    lastModifiedBy: uuidBinary("last_modified_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    modifiedDate: datetimeUtc("modified_date")
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`),
  },
  (table) => ({
    uniqueKeys: [["stateName", "countryId"]],
  })
);

// Cities Table
export const cities = mysqlTable(
  "cities",
  {
    cityId: int("city_id", { unsigned: true }).primaryKey().autoincrement(),
    cityName: varchar("city_name", { length: 64 }).notNull(),
    stateId: int("state_id", { unsigned: true })
      .notNull()
      .references(() => states.stateId),
    lastModifiedBy: uuidBinary("last_modified_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    modifiedDate: datetimeUtc("modified_date")
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`),
  },
  (table) => ({
    uniqueKeys: [["cityName", "stateId"]],
  })
);

// postalCodes Table
export const postalCodes = mysqlTable(
  "postalCodes",
  {
    id: int("id", { unsigned: true }).primaryKey().autoincrement(),
    postalCode: varchar("postal_code", { length: 10 }).notNull(),
    cityId: int("city_id", { unsigned: true })
      .notNull()
      .references(() => cities.cityId),
    lastModifiedBy: uuidBinary("last_modified_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    modifiedDate: datetimeUtc("modified_date")
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`),
  },
  (table) => ({
    uniqueKeys: [["postal_code", "cityId"]],
  })
);

// export const addressTypes = mysqlTable("address_types", {
//   id: uuidBinary("id").notNull().primaryKey().$defaultFn(uuidv7),,
//   code: varchar("code", { length: 64 }).unique().notNull(),
//   label: varchar("label", { length: 255 }).notNull(),
//   isActive: boolean("is_active").default(true)
// });

// export const addressPurposeTypes = mysqlTable("address_purpose_types", {
//   id: uuidBinary("id").notNull().primaryKey().$defaultFn(uuidv7),,
//   code: varchar("code", { length: 64 }).unique().notNull(),
//   label: varchar("label", { length: 255 }).notNull(),
//   isActive: boolean("is_active").default(true)
// });

export const { base: addressTypes, translation: addressTypeTranslations } =
  createLookupTables("address_types");

// Addresses Table
export const addresses = mysqlTable(
  "addresses",
  {
    id: uuidBinary("id").notNull().primaryKey().$defaultFn(uuidv7),

    // Relational FK
    orgId: uuidBinary("org_id").notNull().references(() => organizations.id, { onDelete: "restrict" }),

    // Address classification (refined)
    addressTypeId: uuidBinary("address_type_id").notNull().references(() => addressTypes.id),

    // Address fields (international optimized)
    addressCode: varchar("address_code", { length: 64 }).notNull().default(""),

    // More flexible address fields
    addressLine1: varchar("address_line_1", { length: 128 }).notNull(),
    addressLine2: varchar("address_line_2", { length: 128 }),

    locality: varchar("locality", { length: 128 }), // neighborhood, etc.
    postalCodeId: int("postal_code_id", { unsigned: true }).references(
      () => postalCodes.id
    ), // optional

    latitude: decimal("latitude", { precision: 10, scale: 6 }),
    longitude: decimal("longitude", { precision: 10, scale: 6 }),

    // Audit metadata
    lastModifiedBy: uuidBinary("last_modified_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),

    modifiedDate: datetimeUtc("modified_date")
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`),
  },
  (table) => [
    index("addresses_org_idx").on(table.orgId),
    index("addresses_postal_idx").on(table.postalCodeId),
  ]
);

// export const { base: addrPurposeTypes, translation: addrPurposeTypeTranslations } =
//   createLookupTables("addr_purpose_types");
// export const addressPurposes = mysqlTable(
//   "address_purposes",
//   {
//     addressId: uuidBinary("address_id").notNull().references(() => addresses.id, { onDelete: "restrict" }),
//     purposeTypeId: int("purpose_type_id", {unsigned: true})
//       .notNull()
//       .references(() => addrPurposeTypes.id),
//   },
//   (table) => [primaryKey(table.addressId, table.purposeTypeId)]
// );
