<template>
    <div class="tab" :class="{ 'is-active': isActive }">
        {{ title }}
        <SvgIcon name="cross" class="tab__cross" @click="closeTab" />
    </div>
</template>

<script setup lang="ts">
// * imports
// import { onMounted } from 'vue';
import SvgIcon from '@components/SvgIcon.vue'
// import { uuid } from 'uuidv4'
// import { v4 as uuidv4 } from "uuid"

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
const closeTab = (): void => emit('closeTab')
</script>

<style lang="scss" scoped>
.tab {
    // width: min(100%, 200px);
    position: relative;
    flex: 0 1 250px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 4px;
    padding: 0 em(15);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: border-color 0.25s;

    &:hover,
    &.is-active {
        border-color: var(--primary);
    }

    &__cross {
        width: 10px;
        height: 100%;
        margin-left: auto;
        transition: color 0.25s;

        &:hover {
            color: var(--primary);
        }
    }
}
</style>
