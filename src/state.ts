import {createInterface, type Interface} from "readline";
import {stdin, stdout} from 'node:process';
import {getCommands} from "./repl.js";
import {PokeAPI} from "./pokeapi.js";
import {Cache} from "./pokecache.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface,
  commands: CLICommand[],
  api: PokeAPI,
  nextLocationsURL: string,
  prevLocationsURL: string,
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
  api: new PokeAPI(new Cache(500)),
  nextLocationsURL: "",
  prevLocationsURL: "",
  };
}