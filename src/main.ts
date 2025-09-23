// .js actually refers to .ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";


function main() {
  const newState = initState(); //Starts a new State Interface (see state.ts)
  startREPL(newState); //Contains input processing logic
};

main();