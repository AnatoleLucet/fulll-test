import { Given } from "@cucumber/cucumber";
import { CustomWorld } from "./support/world.js";
import { CreateFleetCommand } from "../../../../src/App/Commands/CreateFleetCommand.js";

Given("my fleet", async function (this: CustomWorld) {
  const command = new CreateFleetCommand("my-user-id");
  this.myFleetId = await this.createFleetHandler.execute(command);
});

Given("the fleet of another user", async function (this: CustomWorld) {
  const command = new CreateFleetCommand("other-user-id");
  this.otherFleetId = await this.createFleetHandler.execute(command);
});
