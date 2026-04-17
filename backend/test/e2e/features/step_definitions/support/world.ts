import { World } from "@cucumber/cucumber";
import { createInMemoryRepositories } from "../../../../../src/Infra/Persistence/index.js";
import { createCLIContainer } from "../../../../../src/Infra/CLI/container.js";
import type { CreateFleetHandler } from "../../../../../src/App/Handlers/CreateFleetHandler.js";
import type { RegisterVehicleHandler } from "../../../../../src/App/Handlers/RegisterVehicleHandler.js";
import type { ParkVehicleHandler } from "../../../../../src/App/Handlers/ParkVehicleHandler.js";
import type { InMemoryFleetRepository } from "../../../../../src/Infra/Persistence/Memory/InMemoryFleetRepository.js";
import type { InMemoryVehicleRepository } from "../../../../../src/Infra/Persistence/Memory/InMemoryVehicleRepository.js";
import { Location } from "../../../../../src/Domain/ValueObjects/Location.js";

export class CustomWorld extends World {
  fleetRepository!: InMemoryFleetRepository;
  vehicleRepository!: InMemoryVehicleRepository;
  createFleetHandler!: CreateFleetHandler;
  registerVehicleHandler!: RegisterVehicleHandler;
  parkVehicleHandler!: ParkVehicleHandler;

  myFleetId!: string;
  otherFleetId!: string;
  vehiclePlateNumber!: string;
  location!: Location;
  lastError!: Error;

  constructor(options: any) {
    super(options);
    this.init();
  }

  init() {
    const { fleetRepository, vehicleRepository } = createInMemoryRepositories();
    this.fleetRepository = fleetRepository as InMemoryFleetRepository;
    this.vehicleRepository = vehicleRepository as InMemoryVehicleRepository;
    
    const container = createCLIContainer(this.fleetRepository, this.vehicleRepository);
    this.createFleetHandler = container.createFleetHandler;
    this.registerVehicleHandler = container.registerVehicleHandler;
    this.parkVehicleHandler = container.parkVehicleHandler;
  }
}
