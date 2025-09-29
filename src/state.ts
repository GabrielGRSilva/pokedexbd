import { createInterface, type Interface } from "readline";
import { stdin, stdout } from 'node:process';
import { getCommands } from "./repl.js"

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  rl: Interface,
  commands: CLICommand[],
};

export function initState(): State {
  const rl = createInterface ({ //Standard interface which waits user input and answers
  input: stdin,
  output: stdout,
  prompt: "Pokedex >",
  });

  return {
  rl,
  commands: Object.values(getCommands()),  
  };
}