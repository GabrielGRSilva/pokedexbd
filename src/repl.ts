import {State} from "./state.js"
import * as c from "./commands.js"

export function getCommands() { //This type will describe which commands are available to the user
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: c.commandExit,
    },
    help: {
      name: "help",
      description: "Explains the available commands",
      callback: c.commandHelp,
    },
    map: {
      name: "map",
      description: "Shows areas of the Pokémon world",
      callback: c.commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Shows previous seen areas of the Pokémon world",
      callback: c.commandMapBack,
    }, 
    explore: {
      name: "explore",
      description: "Shows Pokémon found in a specific area (explore [areatoexplore])",
      callback: c.commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempts to catch a Pokémon",
      callback: c.commandCatch,
    },
  };
};

async function processUserInput(input: string, state: State) {
  if (input.length === 0) {
    console.log("Check the available commands by entering [help]");
    return;

  } else {

    const foundCommand = cleanInput(input)[0]; //First word of input
    const cmd = state.commands;
    
    for (let keyName of cmd) {

      if (foundCommand == "explore" && keyName.name == "explore"|| //Alternate logic as it also passes the user input (second typed word) in some commands
        foundCommand == "catch" && keyName.name == "catch"
        ){
        const area = cleanInput(input)[1];
        await keyName.callback(state, area);
        return;

      }else if (foundCommand == keyName.name) {
        try{
          await keyName.callback(state);
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
    state.rl.on("line", async (line) => {
    await processUserInput(line, state);
    state.rl.prompt();
  });}catch(error) {
    console.log(error);
  }
};

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" "); //User input is "case lowered", trimmed from whitespaces and split for each word
};