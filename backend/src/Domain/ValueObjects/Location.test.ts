import { describe, it, expect } from "vitest";
import { Location } from "./Location.js";

describe("Location", () => {
  it("should create a location with lat/lng", () => {
    const location = new Location(48.8566, 2.3522);
    expect(location.latitude).toBe(48.8566);
    expect(location.longitude).toBe(2.3522);
    expect(location.altitude).toBeUndefined();
  });

  it("should create a location with altitude", () => {
    const location = new Location(48.8566, 2.3522, 100);
    expect(location.altitude).toBe(100);
  });

  it("should identify equal locations", () => {
    const loc1 = new Location(48.8566, 2.3522, 100);
    const loc2 = new Location(48.8566, 2.3522, 100);
    expect(loc1.equals(loc2)).toBe(true);
  });

  it("should identify different latitudes", () => {
    const loc1 = new Location(48.8566, 2.3522);
    const loc2 = new Location(40.7128, 2.3522);
    expect(loc1.equals(loc2)).toBe(false);
  });

  it("should identify different longitudes", () => {
    const loc1 = new Location(48.8566, 2.3522);
    const loc2 = new Location(48.8566, -74.006);
    expect(loc1.equals(loc2)).toBe(false);
  });

  it("should identify different altitudes", () => {
    const loc1 = new Location(48.8566, 2.3522, 100);
    const loc2 = new Location(48.8566, 2.3522, 200);
    expect(loc1.equals(loc2)).toBe(false);
  });

  it("should identify undefined vs defined altitude as different", () => {
    const loc1 = new Location(48.8566, 2.3522);
    const loc2 = new Location(48.8566, 2.3522, 100);
    expect(loc1.equals(loc2)).toBe(false);
  });
});
