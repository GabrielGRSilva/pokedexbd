import { State, CLICommand } from "./state.js"
import { commandExit, commandHelp } from "./commands.js"

export function getCommands(): Record<string, CLICommand> { //This type will describe which commands are available to the user
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Explains the available commands",
      callback: commandHelp,
    },

  };
};

function processUserInput(input: string, state: State) {
    if (input.length === 0) {
    state.rl.prompt();
    return;

    } else {

    const foundCommand = cleanInput(input)[0]; //First word of input
    const cmd = state.commands;

    for (let keyName of cmd) {
        if (foundCommand == keyName.name) {
        try{
            keyName.callback(state);
        } catch (error) {
          console.log("Problem found:", error);
          state.rl.prompt();
          return;
         };
      };
    //If the loop doesn't find the command:
    console.log("Unknown command");
    state.rl.prompt();
    return;
      };
    };
  };

export function startREPL(newState: State) {
        newState.rl.prompt();
        newState.rl.on("line", processUserInput);
};

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" "); //User input is "case lowered", trimmed from whitespaces and split for each word
};