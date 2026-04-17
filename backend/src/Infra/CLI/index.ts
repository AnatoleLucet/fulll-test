import { parseArgs } from "node:util";
import type { CLIContainer } from "./container.js";
import { CreateFleetCommand } from "../../App/Commands/CreateFleetCommand.js";
import { RegisterVehicleCommand } from "../../App/Commands/RegisterVehicleCommand.js";
import { ParkVehicleCommand } from "../../App/Commands/ParkVehicleCommand.js";

export { createCLIContainer } from "./container.js";

export interface CLIConfig {
  container: CLIContainer;
}

export async function runCLI(config: CLIConfig, args: string[]): Promise<void> {
  // didn't want to use commander/yargs/etc because they're not very well designed
  // and tends to make it hard to test the cli itself imo.
  // here you can simply call this runCLI with any args and that's it.
  // no wacky mocking needed. no extra dep. just grows as you need it.
  const { positionals } = parseArgs({
    args,
    allowPositionals: true,
  });

  const [command, ...commandArgs] = positionals;

  if (!command) {
    console.error("Usage: fleet <command> [args...]");
    console.error("Commands:");
    console.error("  create <userId>");
    console.error("  register-vehicle <fleetId> <vehiclePlateNumber>");
    console.error("  localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]");
    process.exit(1);
  }

  try {
    switch (command) {
      case "create": {
        const [userId] = commandArgs;
        if (!userId) {
          console.error("Error: userId is required");
          process.exit(1);
        }
        const cmd = new CreateFleetCommand(userId);
        const fleetId = await config.container.createFleetHandler.execute(cmd);
        console.log(fleetId);
        break;
      }

      case "register-vehicle": {
        const [fleetId, plateNumber] = commandArgs;
        if (!fleetId || !plateNumber) {
          console.error("Error: fleetId and vehiclePlateNumber are required");
          process.exit(1);
        }
        const cmd = new RegisterVehicleCommand(fleetId, plateNumber);
        await config.container.registerVehicleHandler.execute(cmd);
        console.log(`Vehicle ${plateNumber} registered to fleet ${fleetId}`);
        break;
      }

      case "localize-vehicle": {
        const [fleetId, plateNumber, lat, lng, alt] = commandArgs;
        if (!fleetId || !plateNumber || !lat || !lng) {
          console.error("Error: fleetId, vehiclePlateNumber, lat, and lng are required");
          process.exit(1);
        }
        const cmd = new ParkVehicleCommand(
          fleetId,
          plateNumber,
          parseFloat(lat),
          parseFloat(lng),
          alt ? parseFloat(alt) : undefined,
        );
        await config.container.parkVehicleHandler.execute(cmd);
        console.log(
          `Vehicle ${plateNumber} parked at location (${lat}, ${lng}${alt ? `, ${alt}` : ""})`,
        );
        break;
      }

      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
}
