import { generateArrayOfUniqueNumbers } from "./helpers";
import { expect, describe, it } from "vitest";

describe("Helpers", () => {
    it("should return empty array if no options are provided", () => {
        const arr = generateArrayOfUniqueNumbers();
        expect(arr).toHaveLength(0);
    });
    it("should return empty array if size is bigger than interval", () => {
        const arr = generateArrayOfUniqueNumbers({ size: 5 });
        expect(arr).toHaveLength(0);
    });
    it("should return uniquely filled array if interval is twice bigger than size", () => {
        const arr = generateArrayOfUniqueNumbers({ size: 5, interval: 10 });
        expect(arr).toHaveLength(5);
        expect(new Set(arr).size === arr.length).toBeTruthy();
    });
});
