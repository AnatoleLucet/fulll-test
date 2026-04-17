import { randomUUID } from "node:crypto";
import type { IFleetRepository } from "../../../Domain/Ports/IFleetRepository.js";
import { Fleet } from "../../../Domain/Entities/Fleet.js";
import { PlateNumber } from "../../../Domain/ValueObjects/PlateNumber.js";
import type { Database } from "../Drizzle/db.js";
import { fleets, fleetVehicles } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export class DrizzleFleetRepository implements IFleetRepository {
  constructor(private readonly db: Database) {}

  async save(fleet: Fleet): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx
        .insert(fleets)
        .values({ id: fleet.id, userId: fleet.userId })
        .onConflictDoUpdate({
          target: fleets.id,
          set: { userId: fleet.userId },
        });

      await tx.delete(fleetVehicles).where(eq(fleetVehicles.fleetId, fleet.id));

      const plates = fleet.getVehiclePlates();
      for (const plateNumber of plates) {
        await tx.insert(fleetVehicles).values({
          fleetId: fleet.id,
          vehiclePlateNumber: plateNumber.value,
        });
      }
    });
  }

  async findById(id: string): Promise<Fleet | undefined> {
    const fleetData = await this.db.query.fleets.findFirst({
      where: eq(fleets.id, id),
    });

    if (!fleetData) {
      return undefined;
    }

    const fleet = new Fleet(fleetData.id, fleetData.userId);

    const plateData = await this.db
      .select({ plateNumber: fleetVehicles.vehiclePlateNumber })
      .from(fleetVehicles)
      .where(eq(fleetVehicles.fleetId, id));

    for (const { plateNumber } of plateData) {
      fleet.registerVehicle(new PlateNumber(plateNumber));
    }

    return fleet;
  }

  async findByUserId(userId: string): Promise<Fleet | undefined> {
    const fleetData = await this.db.query.fleets.findFirst({
      where: eq(fleets.userId, userId),
    });

    if (!fleetData) {
      return undefined;
    }

    return this.findById(fleetData.id);
  }

  nextId(): string {
    return randomUUID();
  }
}
