import { getCommands } from "./main.js"
import { CLICommand } from "./clicommand.js"

export function commandExit() {
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
};

export function commandHelp(commands: Record<string, CLICommand>): void {

    const commandList = Object.values(getCommands());

    console.log("Welcome to the Pokedex!\nUsage:\n")
    for (let eachCommand of commandList) {
        console.log(`${eachCommand.name}: ${eachCommand.description}`);
    };
};