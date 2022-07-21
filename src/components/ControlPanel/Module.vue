<template>
    <div class="module" :class="{ 'is-expanded': isExpanded }">
        <div class="module__head" @click="toggle()">
            <div class="module__label">{{ label }}</div>
            <SvgIcon name="toggle-arrow" class="module__toggle" />
        </div>
        <div class="module__content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
// * imports
import SvgIcon from '@components/SvgIcon.vue'
import { useToggle } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
    label: {
        type: String,
        default: 'Label',
    },
    defaultState: {
        type: Boolean,
        default: true,
    },
})

const isExpanded = ref(props.defaultState)
const toggle = useToggle(isExpanded)
</script>

<style lang="scss" scoped>
.module {
    position: relative;
    --padding: #{em(15)};
    padding: var(--padding);
    transition: padding 0.3s;
    padding-bottom: 0;

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 100%;
        width: calc(100% - 2 * var(--padding));
        transform: translateX(-50%);
        height: 1px;
        background-color: var(--border-color);
    }

    &__head {
        display: flex;
        justify-content: space-between;
        margin-bottom: em(15);
        @include text-sm;
        font-weight: 500;
        cursor: pointer;

        & > * {
            transition: transform 0.2s;
        }

        &:hover {
            .module__toggle {
                transform: translateY(2px);
            }
        }
    }

    &__toggle {
        width: 12px;
        height: 22px;
    }

    &__content {
        @include dropdown;
    }

    ::v-slotted(.module__content > *) {
        padding-left: var(--padding);
        font-weight: 300;
        @include text-xs;
        margin-bottom: 15px;
        --input-height: 30px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &.is-expanded {
        padding-bottom: var(--padding);

        .module__content {
            @include dropdown-active;
        }

        .module__toggle {
            transform: rotate(180deg);
        }
    }
}
</style>
