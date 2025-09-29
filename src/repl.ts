import {State} from "./state.js"
import {commandExit, commandHelp, commandMap, commandMapBack } from "./commands.js"

export async function getCommands(): Promise<any> { //This type will describe which commands are available to the user
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
    map: {
      name: "map",
      description: "Shows areas of the Pokémon world",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Shows previous seen areas of the Pokémon world",
      callback: commandMapBack,
    },
  };
};

function processUserInput(input: string, state: State) {
  if (input.length === 0) {
  return;

  } else {

    const foundCommand = cleanInput(input)[0]; //First word of input
    const cmd = state.commands;
    for (let keyName of cmd) {
      if (foundCommand == keyName.name) {
      try{
          keyName.callback(state);
          return;
      } catch (error) {
        console.log("Problem found parsing commands:", error);
        return;
        };
      };
    };
    //If the loop doesn't find the command:
    console.log("Unknown command");
    return;
    };
  };

export function startREPL(state: State) {
  state.rl.prompt();
  try {
    state.rl.on("line", (line) => {
    processUserInput(line, state);
    state.rl.prompt();
  });}catch(error) {
    console.log(error);
  }
};

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" "); //User input is "case lowered", trimmed from whitespaces and split for each word
};