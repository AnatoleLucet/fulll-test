import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { CustomWorld } from "./support/world.js";
import { RegisterVehicleCommand } from "../../../../src/App/Commands/RegisterVehicleCommand.js";
import { PlateNumber } from "../../../../src/Domain/ValueObjects/PlateNumber.js";

Given("a vehicle", function (this: CustomWorld) {
  this.vehiclePlateNumber = "ABC-123";
});

Given("I have registered this vehicle into my fleet", async function (this: CustomWorld) {
  const command = new RegisterVehicleCommand(this.myFleetId, this.vehiclePlateNumber);
  await this.registerVehicleHandler.execute(command);
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function (this: CustomWorld) {
    const command = new RegisterVehicleCommand(this.otherFleetId, this.vehiclePlateNumber);
    await this.registerVehicleHandler.execute(command);
  },
);

When("I register this vehicle into my fleet", async function (this: CustomWorld) {
  const command = new RegisterVehicleCommand(this.myFleetId, this.vehiclePlateNumber);
  await this.registerVehicleHandler.execute(command);
});

When("I try to register this vehicle into my fleet", async function (this: CustomWorld) {
  try {
    const command = new RegisterVehicleCommand(this.myFleetId, this.vehiclePlateNumber);
    await this.registerVehicleHandler.execute(command);
  } catch (error) {
    this.lastError = error as Error;
  }
});

Then("this vehicle should be part of my vehicle fleet", async function (this: CustomWorld) {
  const fleet = await this.fleetRepository.findById(this.myFleetId);
  assert(fleet, "Fleet should exist");
  assert(fleet.hasVehicle(new PlateNumber(this.vehiclePlateNumber)), "Vehicle should be in fleet");
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function (this: CustomWorld) {
    assert(this.lastError, "Expected an error");
    assert.strictEqual(
      this.lastError.message,
      "Vehicle has already been registered into this fleet",
    );
  },
);
