/**
 * UUID utilities for Drizzle ORM + TiDB
 *
 * ── Storage format: binary(16) ────────────────────────────────────────────────
 *
 * CHAR(36) vs binary(16) tradeoff:
 *
 *   CHAR(36)   — 36 bytes, human-readable in DB tools, zero conversion code.
 *                Lexicographic ordering on the UUID string is correct for
 *                UUIDv7 (timestamp occupies the leading characters).
 *
 *   binary(16) — 16 bytes (55 % smaller), byte-level ordering is also correct
 *                for UUIDv7. Better B-tree locality: monotonically increasing
 *                inserts avoid page splits in TiDB/InnoDB-compatible engines.
 *                Foreign keys are tighter (16-byte joins vs 36-byte).
 *
 * Decision: binary(16).
 * For a platform with millions of chat messages, notifications, and bookings,
 * the storage and index-performance savings outweigh the minor conversion
 * overhead in application code.
 *
 * ── Generator: uuidv7 npm package ─────────────────────────────────────────────
 *
 * uuidv7 (RFC 9562) encodes a 48-bit Unix timestamp (ms precision) in the
 * high bits, followed by version bits and 74 random bits. This gives:
 *   - Monotonically increasing IDs within the same millisecond
 *   - No coordination required between distributed nodes (random suffix)
 *   - Standard UUID string format for debugging / external APIs
 */

import { customType } from "drizzle-orm/mysql-core";
import { uuidv7 as _uuidv7 } from "uuidv7";

// ─── Generator ────────────────────────────────────────────────────────────────

/**
 * Returns a new UUIDv7 string.
 * Use as `$defaultFn(uuidv7)` on any Drizzle column.
 *
 * Example:
 *   id: uuidBinary("id").notNull().primaryKey().$defaultFn(uuidv7)
 */
export const uuidv7 = (): string => _uuidv7();

// ─── BINARY(16) custom column type ───────────────────────────────────────────

/**
 * Drizzle column type that maps TypeScript `string` (UUID) ↔ `binary(16)` in MySQL/TiDB.
 *
 * toDriver   — converts hyphenated UUID string → 16-byte Buffer on INSERT/UPDATE
 * fromDriver — converts raw bytes back to UUID string on SELECT
 *
 * Driver compatibility note:
 *   mysql2          → returns Buffer
 *   @tidbcloud/serverless → may return Uint8Array or hex string depending on version
 *   The implementation handles all three cases.
 */
export const uuidBinary = customType<{ data: string; driverData: Buffer | Uint8Array | string }>({
  dataType() {
    return "binary(16)";
  },

  toDriver(value: string): Buffer {
    // Strip hyphens and decode hex → raw bytes
    return Buffer.from(value.replace(/-/g, ""), "hex");
  },

  fromDriver(value: Buffer | Uint8Array | string): string {
    let hex: string;

    if (typeof value === "string") {
      // Some drivers return a 32-char hex string for BINARY columns
      if (value.length === 32) {
        hex = value.toLowerCase();
      } else {
        // May be base64 (TiDB serverless HTTP API)
        hex = Buffer.from(value, "base64").toString("hex");
      }
    } else {
      const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
      hex = buf.toString("hex");
    }

    return (
      `${hex.slice(0, 8)}-` +
      `${hex.slice(8, 12)}-` +
      `${hex.slice(12, 16)}-` +
      `${hex.slice(16, 20)}-` +
      `${hex.slice(20)}`
    );
  },
});
