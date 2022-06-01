<template>
    <div id="minesweeper">
        <div id="background"></div>
        <Title class="unselectable" />
        <div id="try" class="unselectable">Try {{ gameNumber }}</div>
        <Canvas
            :field-arr="fieldArr"
            :height="height"
            :width="width"
            :mine-count="mineCount"
            :game-number="gameNumber"
            @mine-click="endGame({ shouldShowPopup: true })"
            @block-click="handleBlockClick"
        />
        <div id="ui">
            <button id="restart-btn" class="unselectable" @click="endGame({ shouldShowPopup: false })">
                <img src="@/assets/restart.svg" height="25" width="25" alt="restart" />
            </button>
        </div>
        <Timer class="unselectable" :count="count" />
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Swal from "sweetalert2";
import Title from "@/components/Title.vue";
import Canvas from "@/components/Canvas.vue";
import Timer from "@/components/Timer.vue";
import { generateArrayOfUniqueNumbers } from "@/utils/helpers";

const height = 12;
const width = 12;
const mineCount = 20;
const fieldArr = [];
let gameNumber = ref(0);
let mines;
let endGameIntervalInstance = undefined;
let count = ref(0);
let countInterval;

/**
 * Creates either block or mine depending on isMine option
 */
function createBlock(isMine, mineCount = 0) {
    return reactive({ isMine, mineCount, isFlipped: false });
}

/**
 * Populates field with mines or empty blocks
 */
function startGame() {
    startInterval();
    console.info("START NEW GAME");
    if (height <= 0 || width <= 0 || mineCount <= 0) {
        Swal.fire(
            `Please initialize with correct constants:
            height: ${height},
            width: ${width},
            mineCount: ${mineCount}
            should have value above 0`
        );
        return;
    }
    mines = generateArrayOfUniqueNumbers({ size: mineCount, interval: width * height });

    for (let i = 0; i < height; i++) {
        if (!fieldArr[i]) {
            fieldArr.push([]);
        }
        for (let j = 0; j < width; j++) {
            let index = i * height + j;
            if (mines.includes(index)) {
                fieldArr[i].push(createBlock(true));
            } else {
                fieldArr[i].push(createBlock(false, mineCounter(index, i, j)));
            }
        }
    }
    gameNumber.value++;
}

startGame();

/**
 * Count mines around a block
 */
function mineCounter(index, i, j) {
    let count = 0;
    if (i > 0 && j > 0) count += mines.includes(index - width - 1);
    if (i > 0) count += mines.includes(index - width);
    if (i > 0 && j < width - 1) count += mines.includes(index - width + 1);

    if (j > 0) count += mines.includes(index - 1);
    if (j < width - 1) count += mines.includes(index + 1);

    if (i < height - 1 && j > 0) count += mines.includes(index + width - 1);
    if (i < height - 1) count += mines.includes(index + width);
    if (i < height - 1 && j < width - 1) count += mines.includes(index + width + 1);

    return count;
}

/**
 * Ends game by flipping all unflipped blocks and restarts game
 * @param shouldShowPopup: if true, opens popup to ask if should restart,
 *                         if false, restarts game right away
 */
function endGame({ shouldShowPopup = false }) {
    stopInterval();
    console.info("END GAME");
    if (endGameIntervalInstance) {
        clearInterval(endGameIntervalInstance);
    }
    showAllBlocks();

    if (shouldShowPopup) {
        endGameIntervalInstance = setTimeout(async () => {
            const result = await Swal.fire({
                title: "Play another turn?",
                showCancelButton: true,
                confirmButtonText: "Restart",
                denyButtonText: "Wait",
            });
            if (result.isConfirmed) {
                restart();
            }
        }, 1000);
    } else {
        restart();
    }
}

function showAllBlocks() {
    // Flip all blocks
    fieldArr.forEach((line) => line.forEach((block) => (block.isFlipped = true)));
}

/**
 * Restarts game
 */
function restart() {
    // To empty const array
    fieldArr.length = 0;
    startGame();
    endGameIntervalInstance = undefined;
}

function handleBlockClick() {
    // TODO: improve it more elegantly
    // Waiting until recursive opening get finished
    setTimeout(() => {
        if (checkIsFinished()) {
            console.log("YOU WON");
            Swal.fire("Congratulations!");
            showAllBlocks();
        }
    }, 200);
}

/**
 * Checks if game is finished
 */
function checkIsFinished() {
    const unFlippedBlockExists = fieldArr.some((line) => {
        return line.some((block) => {
            return !block.isMine && !block.isFlipped;
        });
    });
    return !unFlippedBlockExists;
}

/**
 * Start timer
 */
function startInterval() {
    count.value = 0;
    countInterval = setInterval(() => {
        count.value++;
    }, 1000);
}

/**
 * Stop timer
 */
function stopInterval() {
    clearInterval(countInterval);
}
</script>

<style lang="scss">
* {
    margin: 0;
    font-family: cursive;
}
.unselectable {
    user-select: none;
}
</style>

<style lang="scss" scoped>
#minesweeper {
    height: 100vh;
    width: 100vw;

    #try {
        position: fixed;
        left: 50%;
        top: 10px;
        transform: translateX(-50%);
        font-size: 22px;
        z-index: 1;
        background: #8080802d;
        padding: 5px 10px;
        border-radius: 6px;
    }

    #background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        opacity: 0.02;

        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(0deg, #000 0, #000 40px, #fff 40px, #fff 80px);
        }

        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(90deg, #000 0, #000 40px, #fff 40px, #fff 80px);
            mix-blend-mode: difference;
        }
    }

    #restart-btn {
        height: 40px;
        width: 40px;
        position: fixed;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
        cursor: pointer;
        // center content
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
