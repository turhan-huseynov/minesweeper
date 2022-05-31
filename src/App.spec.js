import { render } from "@testing-library/vue";
import { expect, describe, it } from "vitest";
import App from "./App.vue";

describe("App component", () => {
    it("should render app and page elements", () => {
        const appWrapperObj = render(App);
        const tryElem = appWrapperObj.container.querySelector("#try");
        expect(tryElem).toBeTruthy();
        const minesweeperElem = appWrapperObj.container.querySelector("#minesweeper");
        expect(minesweeperElem).toBeTruthy();
        const restartElem = appWrapperObj.container.querySelector("#restart-btn");
        expect(restartElem).toBeTruthy();
        const bgElem = appWrapperObj.container.querySelector("#background");
        expect(bgElem).toBeTruthy();
        const counterElem = appWrapperObj.container.querySelector("#timer");
        expect(counterElem).toBeTruthy();
    });
});
