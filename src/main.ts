// .js actually refers to .ts
import { startREPL } from "./repl.js";
import { commandExit, commandHelp } from "./commands.js";
import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import type { CLICommand } from "./clicommand.js";

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

export const rl = createInterface({ //Standard interface which waits user input and answers
  input: stdin,
  output: stdout,
  prompt: "Pokedex >",
});

function main() {
  startREPL(); //Contains input processing logic
};
  


main();