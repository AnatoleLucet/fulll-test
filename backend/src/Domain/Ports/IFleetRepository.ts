import { Fleet } from "../Entities/Fleet.js";

export interface IFleetRepository {
  save(fleet: Fleet): Promise<void>;
  findById(id: string): Promise<Fleet | undefined>;
  findByUserId(userId: string): Promise<Fleet | undefined>;
  nextId(): string;
}
