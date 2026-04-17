import { randomUUID } from "node:crypto";
import type { IFleetRepository } from "../../../Domain/Ports/IFleetRepository.js";
import { Fleet } from "../../../Domain/Entities/Fleet.js";

export class InMemoryFleetRepository implements IFleetRepository {
  private fleets: Map<string, Fleet> = new Map();

  async save(fleet: Fleet): Promise<void> {
    this.fleets.set(fleet.id, fleet);
  }

  async findById(id: string): Promise<Fleet | undefined> {
    return this.fleets.get(id);
  }

  async findByUserId(userId: string): Promise<Fleet | undefined> {
    for (const fleet of this.fleets.values()) {
      if (fleet.userId === userId) {
        return fleet;
      }
    }
    return undefined;
  }

  nextId(): string {
    return `fleet-${randomUUID()}`;
  }

  clear(): void {
    this.fleets.clear();
  }
}
