import { rl, getCommands } from "./main.js";

function processUserInput(input: string) {
    if (input.length === 0) {
    rl.prompt();
    return;
    } else {
    const foundCommand = cleanInput(input)[0]; //First word of input
    const commands = getCommands();
    const cmd = commands[foundCommand];
    if (cmd) {
        try{
        cmd.callback(commands);
        } catch (error) {
          console.log("Problem found:", error);
          rl.prompt();
          return;
         };
      }else{
        console.log("Unknown command");
        rl.prompt();
        return;
      };
    };
  };

export function startREPL() {
    rl.prompt();
    rl.on("line", processUserInput) 
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" "); //User input is "case lowered", trimmed from whitespaces and split for each word
}