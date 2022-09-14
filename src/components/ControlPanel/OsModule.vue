<template>
    <div class="module" :class="{ 'is-expanded': isExpanded }">
        <div class="module__head" :class="{'is-clickable': isExpandable}" @click="isExpandable ? toggle() : void(0)">
            <div class="module__label">{{ label }}</div>
            <SvgIcon v-if="isExpandable" name="toggle-arrow" class="module__toggle"/>
        </div>
        <div class="module__content">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
// * imports
import SvgIcon from '@components/OsSvgIcon.vue'
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
    isExpandable: {
        type: Boolean,
        default: true
    }
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

        & > * {
            transition: transform 0.2s;
        }

        &:hover {
            .module__toggle {
                transform: translateY(2px);
            }
        }

        &.is-clickable {
            cursor: pointer;
        }
    }

    &__toggle {
        width: 12px;
        height: 22px;
    }

    &__content {
        @include dropdown;
        padding-left: var(--padding);
    }

    ::v-slotted(.module__content > *) {
        font-weight: 300;
        @include text-sm;
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