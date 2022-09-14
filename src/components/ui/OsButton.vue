<template>
    <button
        class="button"
        :class="[
            variant ? 'button--' + variant : '',
            color ? 'button--' + color : '',
            size ? 'button--' + size : '',
            { 'is-disabled': disabled },
        ]"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
// * imports
import { computed } from 'vue'

// * props
const props = defineProps({
    variant: {
        type: String,
        default: 'solid',
        validator: (value: string) => ['solid', 'outline', 'ghost', 'link'].includes(value),
    },
    color: {
        type: String,
        validator: (value: string) => ['secondary'].includes(value),
    },
    size: {
        type: String,
        default: 'md',
        validator: (value: string) => ['lg', 'md', 'sm', 'xs'].includes(value),
    },

    icon: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})
</script>

<style lang="scss" scoped>
.button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--button-height, 30px);
    border: none;
    border-radius: var(--border-radius);
    text-decoration: none;
    appearance: none;
    padding: em(13) em(26);
    background-color: var(--button-bg-color, var(--primary));
    color: var(--button-color, #fff);
    transition-duration: 0.3s;
    cursor: pointer;

    &:not(.is-disabled):hover {
        --button-bg-color: var(--primary-dark);
        text-decoration: none;
    }

    // ! colors
    &--secondary {
        --button-color: #fff;
        --button-bg-color: var(--secondary);

        &:not(.is-disabled):hover {
            --button-bg-color: var(--secondary-dark);
        }
    }

    // ! variants
    &--solid {
        --button-color: var(--color-text-on-primary);
        --button-color-bg: var(--color-primary);

        &:not(.is-disabled):hover {
            --button-color-bg: var(--color-primary-dark);
        }

        &.is-disabled {
            --button-color-bg: var(--color-bg-disabled);
            --button-color-border: var(--color-bg-disabled);
        }
    }

    &--outline {
        --button-color: var(--primary);
        --button-bg-color: transparent;
        border: 1px solid var(--primary, var(--color));

        &:not(.is-disabled):hover {
            --button-color: #fff;
            --button-bg-color: var(--primary);
        }
    }

    &--ghost {
        --button-color: var(--gray);
        --button-bg-color: transparent;

        &:not(.is-disabled):hover {
            --button-color: #fff;
            --button-bg-color: var(--primary-light);
        }
    }

    &--link {
        --button-color: var(--primary);
        --button-bg-color: transparent;
        min-height: 0;
        padding: 0;
        border-radius: 0;

        &:not(.is-disabled):hover {
            text-decoration: underline;
            --button-bg-color: transparent;
        }
    }

    // ! states
    &.is-disabled {
        --button-color: var(--gray);
        cursor: not-allowed;
    }

    // ! sizes
    &--lg {
        --button-height: 52px;
        font-size: var(--font-size-lg);
    }

    &--md {
        --button-height: 46px;
    }

    &--sm {
        --button-height: 34px;
    }

    &--xs {
        --button-height: 24px;
        font-size: var(--font-size-sm);
    }

    &--fullwidth {
        width: 100%;
    }
}
</style>
