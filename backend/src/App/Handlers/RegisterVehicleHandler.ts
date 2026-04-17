import { RegisterVehicleCommand } from "../Commands/RegisterVehicleCommand.js";
import type { IFleetRepository } from "../../Domain/Ports/IFleetRepository.js";
import type { IVehicleRepository } from "../../Domain/Ports/IVehicleRepository.js";
import { Vehicle } from "../../Domain/Entities/Vehicle.js";
import { PlateNumber } from "../../Domain/ValueObjects/PlateNumber.js";

export class RegisterVehicleHandler {
  constructor(
    private readonly fleetRepository: IFleetRepository,
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(command: RegisterVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepository.findById(command.fleetId);
    if (!fleet) {
      throw new Error("Fleet not found");
    }

    const plateNumber = new PlateNumber(command.vehiclePlateNumber);

    if (fleet.hasVehicle(plateNumber)) {
      throw new Error("Vehicle has already been registered into this fleet");
    }

    let vehicle = await this.vehicleRepository.findByPlateNumber(plateNumber);
    if (!vehicle) {
      vehicle = new Vehicle(plateNumber);
      await this.vehicleRepository.save(vehicle);
    }

    fleet.registerVehicle(plateNumber);
    await this.fleetRepository.save(fleet);
  }
}
