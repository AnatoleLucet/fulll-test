import { Before, setWorldConstructor } from "@cucumber/cucumber";
import { CustomWorld } from "./support/world.js";

setWorldConstructor(CustomWorld);

Before(function (this: CustomWorld) {
  this.fleetRepository.clear();
  this.vehicleRepository.clear();
});
