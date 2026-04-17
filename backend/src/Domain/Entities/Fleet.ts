import { PlateNumber } from "../ValueObjects/PlateNumber.js";

export class Fleet {
  private _vehiclePlates: Set<string> = new Set();

  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}

  registerVehicle(plateNumber: PlateNumber): void {
    const key = plateNumber.value;
    if (this._vehiclePlates.has(key)) {
      throw new Error("Vehicle has already been registered into this fleet");
    }
    this._vehiclePlates.add(key);
  }

  hasVehicle(plateNumber: PlateNumber): boolean {
    return this._vehiclePlates.has(plateNumber.value);
  }

  getVehiclePlates(): PlateNumber[] {
    return Array.from(this._vehiclePlates).map((p) => new PlateNumber(p));
  }
}
