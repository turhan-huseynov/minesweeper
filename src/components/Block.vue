<template>
    <div class="block unselectable" :class="{ mine: isMine, highlight: shouldHighlight, flipped: isFlipped }">
        <div class="flip-block" :class="{ flipped: isFlipped }" @click="clickFunc">
            <div class="flip-block-inner">
                <div class="flip-block-front"></div>
                <div class="flip-block-back">
                    <img v-if="isMine" alt="mine" height="30" width="30" src="@/assets/mine.jpg" />
                    <div v-else>{{ blockText || "" }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
/**
 * isMine: decides if block will be a mine
 * shouldHighlight: decides if background of block will be darker. used for giving chessboard look
 * isFlipped: decides if block clicked
 * clickFunc: function to trigger the block click
 */
defineProps({
    isMine: { type: Boolean, default: false },
    shouldHighlight: { type: Boolean, default: false },
    isFlipped: { type: Boolean, default: false },
    blockText: { type: [String, Number], default: "" },
    clickFunc: {
        type: Function,
        default: () => console.log("Click function not implemented"),
    },
});
</script>

<style lang="scss" scoped>
.block {
    cursor: pointer;

    &.highlight .flip-block .flip-block-inner .flip-block-front {
        background-color: rgb(119, 189, 119);
    }

    &.mine .flip-block .flip-block-inner .flip-block-back {
        background-color: rgb(255, 70, 70);
        color: white;
    }

    &:hover {
        filter: brightness(0.8);
    }

    .flip-block {
        background-color: transparent;
        width: 40px;
        height: 40px;
        perspective: 1000px;

        .flip-block-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.8s;

            .flip-block-front,
            .flip-block-back {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 2px;
            }

            .flip-block-front {
                background-color: rgb(135, 221, 135);

                color: black;
                z-index: 1;
            }

            .flip-block-back {
                background-color: lightgray;
                color: black;
            }
        }

        &.flipped .flip-block-inner .flip-block-back {
            z-index: 5;
        }
    }
}
</style>
