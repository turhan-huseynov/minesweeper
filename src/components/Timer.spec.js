import { render } from "@testing-library/vue";
import { expect, describe, it } from "vitest";
import Timer from "./Timer.vue";

describe("Timer component", () => {
    it("should render time", () => {
        const timerWrapperObj = render(Timer);
        const minutesElem = timerWrapperObj.getByText("00:");
        expect(minutesElem).toBeTruthy();
        const secondsElem = timerWrapperObj.getByText("00");
        expect(secondsElem).toBeTruthy();
    });
});
