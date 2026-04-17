import { describe, it, expect } from "vitest";
import { Fleet } from "./Fleet.js";
import { PlateNumber } from "../ValueObjects/PlateNumber.js";

describe("Fleet", () => {
  it("should create a fleet with id and userId", () => {
    const fleet = new Fleet("fleet-1", "user-123");
    expect(fleet.id).toBe("fleet-1");
    expect(fleet.userId).toBe("user-123");
  });

  it("should register a vehicle", () => {
    const fleet = new Fleet("fleet-1", "user-123");
    const plate = new PlateNumber("ABC-123");

    fleet.registerVehicle(plate);

    expect(fleet.hasVehicle(plate)).toBe(true);
  });

  it("should throw error when registering duplicate vehicle", () => {
    const fleet = new Fleet("fleet-1", "user-123");
    const plate = new PlateNumber("ABC-123");

    fleet.registerVehicle(plate);

    expect(() => fleet.registerVehicle(plate)).toThrow(
      "Vehicle has already been registered into this fleet",
    );
  });

  it("should return false for unregistered vehicle", () => {
    const fleet = new Fleet("fleet-1", "user-123");
    const plate = new PlateNumber("ABC-123");

    expect(fleet.hasVehicle(plate)).toBe(false);
  });

  it("should get all vehicle plates", () => {
    const fleet = new Fleet("fleet-1", "user-123");
    const plate1 = new PlateNumber("ABC-123");
    const plate2 = new PlateNumber("XYZ-789");

    fleet.registerVehicle(plate1);
    fleet.registerVehicle(plate2);

    const plates = fleet.getVehiclePlates();
    expect(plates).toHaveLength(2);
    expect(plates.map((p: PlateNumber) => p.value)).toContain("ABC-123");
    expect(plates.map((p: PlateNumber) => p.value)).toContain("XYZ-789");
  });
});
