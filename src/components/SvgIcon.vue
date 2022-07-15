<template>
    <span class="icon" :class="class">
        <svg aria-hidden="true">
            <use :href="symbolId" />
        </svg>
    </span>
</template>

<script setup lang="ts">
// * imports
import { computed } from 'vue'
import 'external-svg-loader'

// * props
const props = defineProps({
    prefix: {
        type: String,
        default: 'icon',
    },
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: '#fff',
    },
})

const cssVars = computed(() => {
    // return props.color || '#fff'
    return {
        '--color': props.color || '#fff',
    }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss" scoped>
.icon {
    display: flex;
    color: v-bind('cssVars[' --color ']');

    svg {
        margin: auto;
        width: 100%;
        height: 100%;
    }
}
</style>
