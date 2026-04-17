import { DrizzleFleetRepository } from "./Drizzle/DrizzleFleetRepository.js";
import { DrizzleVehicleRepository } from "./Drizzle/DrizzleVehicleRepository.js";
import { InMemoryFleetRepository } from "./Memory/InMemoryFleetRepository.js";
import { InMemoryVehicleRepository } from "./Memory/InMemoryVehicleRepository.js";
import type { Database } from "./Drizzle/db.js";

export function createDrizzleRepositories(db: Database) {
  return {
    fleetRepository: new DrizzleFleetRepository(db),
    vehicleRepository: new DrizzleVehicleRepository(db),
  };
}

export function createInMemoryRepositories() {
  return {
    fleetRepository: new InMemoryFleetRepository(),
    vehicleRepository: new InMemoryVehicleRepository(),
  };
}
