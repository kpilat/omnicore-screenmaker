<template>
    <div class="tab" :class="{ 'is-active': isActive }">
        {{ title }}
        <SvgIcon name="cross" class="tab__cross" @click="closeTab" />
    </div>
</template>

<script setup lang="ts">
// * imports
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SvgIcon from '@components/SvgIcon.vue'

// * props
const props = defineProps({
    componentId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'New Tab',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
})

// * close tab
const emit = defineEmits<{ (e: 'closeTab'): void }>()
const closeTab = (): void => {
    emit('closeTab')
}
</script>

<style lang="scss" scoped>
.tab {
    --width: 250px;
    position: relative;
    flex: 0 1 var(--width);
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 4px;
    padding: 0 em(15);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: border-color 0.25s;
    max-width: var(--width);
    overflow: hidden;

    &:hover,
    &.is-active {
        border-color: var(--primary);
    }

    &__cross {
        width: 40px;
        position: absolute;
        right: 0;
        height: 100%;
        margin-left: auto;
        padding: 0 em(15);
        transition: color 0.25s;

        &:hover {
            color: var(--primary);
        }
    }

    // mounted & unmounted transition
    &.v-enter-active,
    &.v-leave-active {
        transition: all 0.1s ease;
        white-space: nowrap;
    }
    &.v-enter-from,
    &.v-leave-to {
        max-width: 0;
        opacity: 0;
    }
}
</style>
