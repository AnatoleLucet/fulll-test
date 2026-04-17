import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { CustomWorld } from "./support/world.js";
import { ParkVehicleCommand } from "../../../../src/App/Commands/ParkVehicleCommand.js";
import { Location } from "../../../../src/Domain/ValueObjects/Location.js";
import { PlateNumber } from "../../../../src/Domain/ValueObjects/PlateNumber.js";

Given("a location", function (this: CustomWorld) {
  this.location = new Location(48.8566, 2.3522);
});

Given("my vehicle has been parked into this location", async function (this: CustomWorld) {
  const command = new ParkVehicleCommand(
    this.myFleetId,
    this.vehiclePlateNumber,
    this.location.latitude,
    this.location.longitude,
    this.location.altitude,
  );
  await this.parkVehicleHandler.execute(command);
});

When("I park my vehicle at this location", async function (this: CustomWorld) {
  const command = new ParkVehicleCommand(
    this.myFleetId,
    this.vehiclePlateNumber,
    this.location.latitude,
    this.location.longitude,
    this.location.altitude,
  );
  await this.parkVehicleHandler.execute(command);
});

When("I try to park my vehicle at this location", async function (this: CustomWorld) {
  try {
    const command = new ParkVehicleCommand(
      this.myFleetId,
      this.vehiclePlateNumber,
      this.location.latitude,
      this.location.longitude,
      this.location.altitude,
    );
    await this.parkVehicleHandler.execute(command);
  } catch (error) {
    this.lastError = error as Error;
  }
});

Then(
  "the known location of my vehicle should verify this location",
  async function (this: CustomWorld) {
    const vehicle = await this.vehicleRepository.findByPlateNumber(
      new PlateNumber(this.vehiclePlateNumber),
    );
    assert(vehicle, "Vehicle should exist");
    assert(vehicle.currentLocation, "Vehicle should have a location");
    assert.strictEqual(vehicle.currentLocation.latitude, this.location.latitude);
    assert.strictEqual(vehicle.currentLocation.longitude, this.location.longitude);
  },
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  function (this: CustomWorld) {
    assert(this.lastError, "Expected an error");
    assert.strictEqual(this.lastError.message, "Vehicle is already parked at this location");
  },
);
