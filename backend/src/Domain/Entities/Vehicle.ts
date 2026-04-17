import { Location } from "../ValueObjects/Location.js";
import { PlateNumber } from "../ValueObjects/PlateNumber.js";

export class Vehicle {
  private _currentLocation?: Location;

  constructor(public readonly plateNumber: PlateNumber) {}

  get currentLocation(): Location | undefined {
    return this._currentLocation;
  }

  park(location: Location): void {
    if (this._currentLocation && this._currentLocation.equals(location)) {
      throw new Error("Vehicle is already parked at this location");
    }

    this._currentLocation = location;
  }
}
