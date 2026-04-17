import { describe, it, expect } from "vitest";
import { PlateNumber } from "./PlateNumber.js";

describe("PlateNumber", () => {
  it("should create a valid plate number", () => {
    const plate = new PlateNumber("ABC-123");
    expect(plate.value).toBe("ABC-123");
  });

  it("should throw error for empty string", () => {
    expect(() => new PlateNumber("")).toThrow("Plate number cannot be empty");
  });

  it("should throw error for whitespace only", () => {
    expect(() => new PlateNumber("   ")).toThrow("Plate number cannot be empty");
  });

  it("should identify equal plate numbers", () => {
    const plate1 = new PlateNumber("ABC-123");
    const plate2 = new PlateNumber("ABC-123");
    expect(plate1.equals(plate2)).toBe(true);
  });

  it("should identify different plate numbers", () => {
    const plate1 = new PlateNumber("ABC-123");
    const plate2 = new PlateNumber("XYZ-789");
    expect(plate1.equals(plate2)).toBe(false);
  });
});
