import { sql } from "drizzle-orm";
import { customType, timestamp } from "drizzle-orm/mysql-core";

// export const datetimeUtc = (name: string, precision: number) =>
//   customType<{ data: Date; driverData: string }>({
//     dataType() {
//       return `datetime(${precision})`;
//     },
//     toDriver(value: Date): string {
//       return value.toISOString().slice(0, 19).replace("T", " ");
//     },
//     fromDriver(value: string): Date {
//       return new Date(value.replace(" ", "T") + "Z");
//     },
//   })(name)
//     .$default(() => sql`CURRENT_TIMESTAMP(3)`)
//     .$onUpdate(() => sql`CURRENT_TIMESTAMP(3)`);

export const datetimeUtc = (name: string) => 
  timestamp(name, { mode: 'date', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .onUpdateNow();