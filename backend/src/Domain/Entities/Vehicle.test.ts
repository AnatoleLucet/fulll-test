import { describe, it, expect } from "vitest";
import { Vehicle } from "./Vehicle.js";
import { PlateNumber } from "../ValueObjects/PlateNumber.js";
import { Location } from "../ValueObjects/Location.js";

describe("Vehicle", () => {
  it("should create a vehicle with plate number", () => {
    const plate = new PlateNumber("ABC-123");
    const vehicle = new Vehicle(plate);
    expect(vehicle.plateNumber.value).toBe("ABC-123");
    expect(vehicle.currentLocation).toBeUndefined();
  });

  it("should park at a location", () => {
    const vehicle = new Vehicle(new PlateNumber("ABC-123"));
    const location = new Location(48.8566, 2.3522);

    vehicle.park(location);

    expect(vehicle.currentLocation).toBeDefined();
    expect(vehicle.currentLocation?.latitude).toBe(48.8566);
    expect(vehicle.currentLocation?.longitude).toBe(2.3522);
  });

  it("should throw error when parking at same location twice", () => {
    const vehicle = new Vehicle(new PlateNumber("ABC-123"));
    const location = new Location(48.8566, 2.3522);

    vehicle.park(location);

    expect(() => vehicle.park(location)).toThrow("Vehicle is already parked at this location");
  });

  it("should allow parking at different locations", () => {
    const vehicle = new Vehicle(new PlateNumber("ABC-123"));
    const location1 = new Location(48.8566, 2.3522);
    const location2 = new Location(40.7128, -74.006);

    vehicle.park(location1);
    vehicle.park(location2);

    expect(vehicle.currentLocation?.latitude).toBe(40.7128);
  });
});
