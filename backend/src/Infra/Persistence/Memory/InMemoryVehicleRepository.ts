import type { IVehicleRepository } from "../../../Domain/Ports/IVehicleRepository.js";
import { Vehicle } from "../../../Domain/Entities/Vehicle.js";
import { PlateNumber } from "../../../Domain/ValueObjects/PlateNumber.js";

export class InMemoryVehicleRepository implements IVehicleRepository {
  private vehicles: Map<string, Vehicle> = new Map();

  async save(vehicle: Vehicle): Promise<void> {
    this.vehicles.set(vehicle.plateNumber.value, vehicle);
  }

  async findByPlateNumber(plateNumber: PlateNumber): Promise<Vehicle | undefined> {
    return this.vehicles.get(plateNumber.value);
  }

  clear(): void {
    this.vehicles.clear();
  }
}
