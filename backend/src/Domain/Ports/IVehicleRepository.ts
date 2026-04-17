import { Vehicle } from "../Entities/Vehicle.js";
import { PlateNumber } from "../ValueObjects/PlateNumber.js";

export interface IVehicleRepository {
  save(vehicle: Vehicle): Promise<void>;
  findByPlateNumber(plateNumber: PlateNumber): Promise<Vehicle | undefined>;
}
