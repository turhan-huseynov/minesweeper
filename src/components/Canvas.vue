<template>
    <div id="canvas">
        <div v-for="i in height" :key="i" class="line">
            <div v-for="j in width" :key="j" class="block">
                <!-- Mine -->
                <Block
                    v-if="fieldArr[i - 1][j - 1].isMine"
                    :isMine="true"
                    :shouldHighlight="(i + j) % 2 == 0"
                    :isFlipped="fieldArr[i - 1][j - 1].isFlipped"
                    :clickFunc="() => emits('mine-click')"
                />
                <!-- Block -->
                <Block
                    v-else
                    :isMine="false"
                    :shouldHighlight="(i + j) % 2 == 0"
                    :isFlipped="fieldArr[i - 1][j - 1].isFlipped"
                    :blockText="fieldArr[i - 1][j - 1].mineCount"
                    :clickFunc="() => recursivelyOpenBlocks(i - 1, j - 1)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import Block from "@/components/Block.vue";

let props = defineProps({
    fieldArr: { type: Array, default: [] },
    height: { type: Number, default: 1 },
    width: { type: Number, default: 1 },
    mineCount: { type: Number, default: 1 },
    gameNumber: { type: Number, default: 1 },
});
const emits = defineEmits(["mine-click", "block-click"]);

function recursivelyOpenBlocks(i, j) {
    openBlock(i, j, props.gameNumber);
    emits("block-click");
}
/**
 * Recursively flips all unflipped neighbor blockes that has no mine around
 */
function openBlock(i, j, prevGameNumber) {
    const speed = 20;
    // Prevent recursive call if restart is called before the recursion ends
    if (props.gameNumber !== prevGameNumber) {
        return;
    }
    const selectedBlock = props.fieldArr[i][j];
    // Skip mines and already opened blockes
    if (selectedBlock?.isMine || selectedBlock?.isFlipped) {
        return;
    }
    selectedBlock.isFlipped = true;

    // Using setTimeout for animation purposes
    setTimeout(() => {
        if (selectedBlock.mineCount == 0) {
            if (i > 0 && j > 0) openBlock(i - 1, j - 1, prevGameNumber);
            if (i > 0) openBlock(i - 1, j, prevGameNumber);
            if (i > 0 && j < props.width - 1) openBlock(i - 1, j + 1, prevGameNumber);
            if (j > 0) openBlock(i, j - 1, prevGameNumber);
            if (j < props.width - 1) openBlock(i, j + 1, prevGameNumber);
            if (i < props.height - 1 && j > 0) openBlock(i + 1, j - 1, prevGameNumber);
            if (i < props.height - 1) openBlock(i + 1, j, prevGameNumber);
            if (i < props.height - 1 && j < props.width - 1) openBlock(i + 1, j + 1, prevGameNumber);
        }
    }, speed);
}
</script>

<style lang="scss" scoped>
#canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid rgb(218, 218, 218);
    border-radius: 12px;
    overflow: hidden;

    .line {
        display: flex;
    }
}
</style>
