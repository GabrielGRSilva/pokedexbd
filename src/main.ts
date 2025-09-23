// repl.js actually refers to repl.ts
import { startREPL, cleanInput } from "./repl.js";

import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

function callback(input: string) {
  if (input.length === 0) {
    rl.prompt();
    return;
  } else {
  const cleanedInput = cleanInput(input); 
  console.log(`Your command was: <${cleanedInput}>`);
  rl.prompt();
  return;
  }
}

const rl = createInterface({ //Standard interface which waits user input and answers
  input: stdin,
  output: stdout,
  prompt: "Pokedex >",
});

function main() {
  startREPL();
  rl.prompt();
  rl.on("line", (input) => {
    if (input.length === 0) {
    rl.prompt();
    return;
  } else {
  const cleanedInput = cleanInput(input); 
  console.log(`Your command was: ${cleanedInput[0]}`);
  rl.prompt();
  return;
  }});
  }


main();