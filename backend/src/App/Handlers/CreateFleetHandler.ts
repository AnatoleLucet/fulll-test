import { CreateFleetCommand } from "../Commands/CreateFleetCommand.js";
import type { IFleetRepository } from "../../Domain/Ports/IFleetRepository.js";
import { Fleet } from "../../Domain/Entities/Fleet.js";

export class CreateFleetHandler {
  constructor(private readonly fleetRepository: IFleetRepository) {}

  async execute(command: CreateFleetCommand): Promise<string> {
    const fleetId = this.fleetRepository.nextId();

    const fleet = new Fleet(fleetId, command.userId);
    await this.fleetRepository.save(fleet);

    return fleetId;
  }
}
