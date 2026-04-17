import { ParkVehicleCommand } from "../Commands/ParkVehicleCommand.js";
import type { IFleetRepository } from "../../Domain/Ports/IFleetRepository.js";
import type { IVehicleRepository } from "../../Domain/Ports/IVehicleRepository.js";
import { Location } from "../../Domain/ValueObjects/Location.js";
import { PlateNumber } from "../../Domain/ValueObjects/PlateNumber.js";

export class ParkVehicleHandler {
  constructor(
    private readonly fleetRepository: IFleetRepository,
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(command: ParkVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepository.findById(command.fleetId);
    if (!fleet) {
      throw new Error("Fleet not found");
    }

    const plateNumber = new PlateNumber(command.vehiclePlateNumber);

    if (!fleet.hasVehicle(plateNumber)) {
      throw new Error("Vehicle is not registered in this fleet");
    }

    const vehicle = await this.vehicleRepository.findByPlateNumber(plateNumber);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    const location = new Location(command.latitude, command.longitude, command.altitude);

    vehicle.park(location);
    await this.vehicleRepository.save(vehicle);
  }
}
