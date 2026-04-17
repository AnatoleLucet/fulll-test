import type { IVehicleRepository } from "../../../Domain/Ports/IVehicleRepository.js";
import { Vehicle } from "../../../Domain/Entities/Vehicle.js";
import { PlateNumber } from "../../../Domain/ValueObjects/PlateNumber.js";
import { Location } from "../../../Domain/ValueObjects/Location.js";
import type { Database } from "./db.js";
import { vehicles } from "./schema.js";
import { eq } from "drizzle-orm";

export class DrizzleVehicleRepository implements IVehicleRepository {
  constructor(private readonly db: Database) {}

  async save(vehicle: Vehicle): Promise<void> {
    const location = vehicle.currentLocation;

    await this.db
      .insert(vehicles)
      .values({
        plateNumber: vehicle.plateNumber.value,
        latitude: location?.latitude.toString() ?? null,
        longitude: location?.longitude.toString() ?? null,
        altitude: location?.altitude?.toString() ?? null,
      })
      .onConflictDoUpdate({
        target: vehicles.plateNumber,
        set: {
          latitude: location?.latitude.toString() ?? null,
          longitude: location?.longitude.toString() ?? null,
          altitude: location?.altitude?.toString() ?? null,
          updatedAt: new Date(),
        },
      });
  }

  async findByPlateNumber(plateNumber: PlateNumber): Promise<Vehicle | undefined> {
    const vehicleData = await this.db.query.vehicles.findFirst({
      where: eq(vehicles.plateNumber, plateNumber.value),
    });

    if (!vehicleData) {
      return undefined;
    }

    const vehicle = new Vehicle(new PlateNumber(vehicleData.plateNumber));

    if (vehicleData.latitude !== null && vehicleData.longitude !== null) {
      vehicle.park(
        new Location(
          parseFloat(vehicleData.latitude),
          parseFloat(vehicleData.longitude),
          vehicleData.altitude ? parseFloat(vehicleData.altitude) : undefined,
        ),
      );
    }

    return vehicle;
  }
}
