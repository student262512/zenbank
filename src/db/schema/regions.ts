// regions.ts
import {
  mysqlTable,
  smallint,
  varchar,
  boolean,
  json,
  index,
  uniqueIndex,
  int,
} from "drizzle-orm/mysql-core";
import { auditFieldsWithoutRegion } from "@/db/schema/shared/audit";
// import { auditFields, auditFieldsWithoutRegion } from "./shared/types";
import { countries } from "@/db/schema/addresses";

export const dataRegions = mysqlTable(
  "data_regions",
  {
    id: smallint("id", { unsigned: true }).primaryKey(),

    // Human readable
    name: varchar("name", { length: 64 }).notNull(),

    // Stable internal code (EU, IN, US, CN, MEA, APAC)
    code: varchar("code", { length: 16 }).notNull(),

    // Compliance regimes applicable in this region
    compliance_tags: json("compliance_tags").notNull(),
    /*
      Examples:
      ["GDPR", "DPDP", "HIPAA", "SOX"]
    */

    // Whether data is allowed to leave this region
    cross_border_allowed: boolean("cross_border_allowed")
      .notNull()
      .default(false),

    // Primary cloud region (for infra mapping)
    primary_cloud_region: varchar("primary_cloud_region", { length: 32 }),

    is_active: boolean("is_active").notNull().default(true),

    // ...auditFieldsWithoutRegion,
    ...auditFieldsWithoutRegion(),
  },
  (t) => [
    uniqueIndex("uq_data_regions_code").on(t.code),
    index("idx_data_regions_active").on(t.is_active),
  ]
);

export const countryRegionMap = mysqlTable(
  "country_region_map",
  {
    country_id: int("country_id", { unsigned: true })
      .notNull()
      .references(() => countries.countryId, { onDelete: "restrict" }),

    // region_id: smallint("region_id")
    //   .notNull()
    //   .references(() => dataRegions.id, { onDelete: "restrict" }),

    // ...auditFields,
    // ...auditFieldsWithoutRegion,
    ...auditFieldsWithoutRegion(),
    region_id: smallint("region_id", { unsigned: true })
      .notNull()
      .references(() => dataRegions.id, { onDelete: "restrict" }),
    // ...auditFields(),
  },
  (t) => [
    uniqueIndex("uq_country_region").on(t.country_id),
    index("idx_country_region_region").on(t.region_id),
  ]
);