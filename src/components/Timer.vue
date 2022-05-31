<template>
    <div id="timer">
        <span v-if="hours > 0" id="hours">{{ hours }}:</span>
        <span id="minutes">{{ minutes }}:</span>
        <span id="seconds">{{ seconds }}</span>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    count: { type: Number, default: 0 },
});

const seconds = computed(() => {
    let num = props.count % 60;
    if (num < 10) {
        return "0" + num;
    }
    return num;
});

const minutes = computed(() => {
    let num;
    try {
        num = parseInt((props.count / 60) % 60);
    } catch (err) {
        console.debug(err);
        num = 0;
    }
    if (num < 10) {
        return "0" + num;
    }
    return num;
});

const hours = computed(() => {
    let num;
    try {
        num = parseInt((props.count / (24 * 60)) % 60);
    } catch (err) {
        console.debug(err);
        num = 0;
    }
    if (num < 10) {
        return "0" + num;
    }
    return num;
});
</script>

<style lang="scss" scoped>
#timer {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    color: gray;
}
</style>
