import { render } from "@testing-library/vue";
import { expect, describe, it } from "vitest";
import Canvas from "./Canvas.vue";

describe("Canvas component", () => {
    it("should render canvas and page elements", () => {
        const dummyFieldArr = [
            [
                {
                    isMine: false,
                    mineCount: 0,
                    isFlipped: false,
                },
            ],
        ];
        const canvasWrapperObj = render(Canvas, {
            props: {
                fieldArr: dummyFieldArr,
                width: 1,
                height: 1,
            },
        });
        const canvasElem = canvasWrapperObj.container.querySelector("#canvas");
        expect(canvasElem).toBeTruthy();
    });
});
