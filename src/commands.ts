import { CLICommand, State } from "./state.js"

export function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();
    process.exit(0);
};

export function commandHelp(state: State): void {

    console.log("Welcome to the Pokedex!\nUsage:\n")

    for (let eachCommand of state.commands) {
        console.log(`${eachCommand.name}: ${eachCommand.description}`);
    };
};