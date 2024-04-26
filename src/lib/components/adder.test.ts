import { it, expect } from "vitest"
import { adder } from "./adder"

it("adds 1 to the value", () => {
  expect(adder(1)).toBe(2)
})
