<template>
    <component :is="as" class="flex" :class="'flex--' + direction">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    as: {
        type: String,
        default: 'div'
    },
    direction: {
        type: String,
        default: 'row',
        validator: (value: string) => {
            return ['row', 'column'].includes(value)
        }
    },
    wrap: {
        type: Boolean,
        default: false
    }
    ,
    align: {
        type: String,
        default: 'normal',
        validator:
            (value: string) => {
                return ['normal', 'stretch', 'center', 'start', 'end', 'flex-start', 'flex-end'].includes(value)
            }
    }
    ,
    justify: {
        type: String,
        default: 'normal',
        validator:
            (value: string) => {
                return ['normal', 'center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right', 'space-between', 'space-around', 'space-evenly', 'stretch'].includes(value)
            }
    }
    ,
    spacing: {
        type: Number,
        default: 2
    }
    ,
    spacingX: {
        type: Number,
        default: (props: any) => props.spacing
    }
    ,
    spacingY: {
        type: Number,
        default: (props: any) => props.spacing
    }
})

const wrapCss = computed(() => props.wrap ? 'wrap' : 'nowrap')
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    flex-wrap: v-bind(wrapCss);
    align-items: v-bind(align);
    justify-content: v-bind(justify);
    row-gap: calc(var(--spacing) * v-bind(spacingY));
    column-gap: calc(var(--spacing) * v-bind(spacingX));

    &--row {
        @include deep-mx-0;
        flex-direction: row;
    }

    &--column {
        @include deep-my-0;
        flex-direction: column;
    }
}
</style>
