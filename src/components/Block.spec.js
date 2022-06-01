import { render, fireEvent, waitFor } from "@testing-library/vue";
import { expect, describe, it, afterEach } from "vitest";
import Block from "./Block.vue";

describe("Block component", () => {
    let wrapper;

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    it("should match the snapshot", () => {
        wrapper = render(Block, { props: { isFlipped: true, shouldHighlight: true, blockText: 5 } });

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render a number block", () => {
        wrapper = render(Block, { props: { blockText: 5 } });
        const numberElem = wrapper.getByText(5);
        expect(numberElem).toBeTruthy();
    });

    it("should render a mine", () => {
        wrapper = render(Block, { props: { isMine: true, blockText: "Mine" } });
        const button = wrapper.getByText("Mine");
        expect(button).toBeTruthy();
    });

    it("should call the prop function", async () => {
        let isCalled = false;
        const fn = () => {
            isCalled = true;
        };
        wrapper = render(Block, { props: { clickFunc: fn, blockText: "Test" } });
        const blockElem = wrapper.getByText("Test");

        await fireEvent.click(blockElem);
        await waitFor(() => {
            expect(isCalled).toBeTruthy();
        });
    });

    it("should flip block after click", async () => {
        wrapper = render(Block, { props: { blockText: "Deneme", isFlipped: true } });
        const flippedElem = wrapper.container.getElementsByClassName("flipped");
        expect(flippedElem.length).toBe(2);
    });

    // TODO: Add test for Mine click
});
