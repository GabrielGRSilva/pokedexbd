export function startREPL() {}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" "); //User input is "case lowered", trimmed from whitespaces and split for each word
}