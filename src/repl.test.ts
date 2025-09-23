import { cleanInput } from "./repl";

import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "pikachu is kinda sus            ",
    expected: ["pikachu", "is", "kinda", "sus"],
  },
  {
    input: "  I love Charmander and Bulbiiiiisaur",
    expected: ["I", "love", "Charmander", "and", "Bulbiiiiisaur"],
  },
  {
    input: "  Should Ash be a champion  ",
    expected: ["Should", "Ash", "be", "a", "champion"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    cleanInput(input)
    expect(expected).toHaveLength(expected.length);
    for (const i in expected) {
      expect(expected[i]).toBe(expected[i]);
    }
  });
});