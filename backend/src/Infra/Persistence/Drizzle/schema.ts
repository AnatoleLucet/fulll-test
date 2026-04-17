import { pgTable, varchar, decimal, timestamp, uuid, primaryKey } from "drizzle-orm/pg-core";

export const fleets = pgTable("fleets", {
  id: uuid("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vehicles = pgTable("vehicles", {
  plateNumber: varchar("plate_number", { length: 255 }).primaryKey(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  altitude: decimal("altitude", { precision: 10, scale: 2 }),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const fleetVehicles = pgTable(
  "fleet_vehicles",
  {
    fleetId: uuid("fleet_id")
      .notNull()
      .references(() => fleets.id, { onDelete: "cascade" }),
    vehiclePlateNumber: varchar("vehicle_plate_number", { length: 255 })
      .notNull()
      .references(() => vehicles.plateNumber, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.fleetId, table.vehiclePlateNumber] })],
);

export type Fleet = typeof fleets.$inferSelect;
export type NewFleet = typeof fleets.$inferInsert;
export type Vehicle = typeof vehicles.$inferSelect;
export type NewVehicle = typeof vehicles.$inferInsert;
export type FleetVehicle = typeof fleetVehicles.$inferSelect;
export type NewFleetVehicle = typeof fleetVehicles.$inferInsert;
