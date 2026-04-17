import type { IFleetRepository } from "../../Domain/Ports/IFleetRepository.js";
import type { IVehicleRepository } from "../../Domain/Ports/IVehicleRepository.js";
import { CreateFleetHandler } from "../../App/Handlers/CreateFleetHandler.js";
import { RegisterVehicleHandler } from "../../App/Handlers/RegisterVehicleHandler.js";
import { ParkVehicleHandler } from "../../App/Handlers/ParkVehicleHandler.js";

export interface CLIContainer {
  createFleetHandler: CreateFleetHandler;
  registerVehicleHandler: RegisterVehicleHandler;
  parkVehicleHandler: ParkVehicleHandler;
}

export function createCLIContainer(
  fleetRepository: IFleetRepository,
  vehicleRepository: IVehicleRepository,
): CLIContainer {
  return {
    createFleetHandler: new CreateFleetHandler(fleetRepository),
    registerVehicleHandler: new RegisterVehicleHandler(fleetRepository, vehicleRepository),
    parkVehicleHandler: new ParkVehicleHandler(fleetRepository, vehicleRepository),
  };
}
