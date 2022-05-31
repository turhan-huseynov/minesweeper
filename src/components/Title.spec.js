import { render } from "@testing-library/vue";
import { expect, describe, it } from "vitest";
import Title from "./Title.vue";

describe("Title component", () => {
    it("should render title", () => {
        const screen = render(Title);
        const title = screen.getByText("MINESWEEPER");
        expect(title).toBeTruthy();
    });
});
