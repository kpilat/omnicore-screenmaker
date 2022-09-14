<template>
    <!-- <teleport to=".modal__header" :disabled="true"> -->
    <div class="tabs">
        <div class="tabs__header">
            <div
                class="tabs__item"
                v-for="tab in tabs"
                :key="tab.props.title"
                @click="selectedTitle = tab.props.title"
                :class="{ 'is-active': selectedTitle === tab.props.title }"
            >
                <SvgIcon v-if="tab.props.icon" :name="tab.props.icon" />
                {{ tab.props.title }}
            </div>
        </div>
        <div class="tabs__content">
            <slot ref="slots" />
        </div>
    </div>
</template>

<script setup lang="ts">
import TabContent from '@components/tabs/OsTabContent.vue'
import { ref, provide, onMounted, useSlots } from 'vue'
import type { InjectionKey } from 'vue'
import SvgIcon from '@components/OsSvgIcon.vue'

const slots: any = useSlots()
// const tabTitles = slots.default().map((tab: InstanceType<typeof TabContent>) => tab.props.title)
const tabs: Array<InstanceType<typeof TabContent>> = slots.default()
const selectedTitle = ref<InjectionKey<string>>(tabs[0].props.title)

provide('selectedTitle', selectedTitle)
</script>

<style lang="scss" scoped>
.tabs {
    height: 100%;

    &__header {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        @include text-lg;
        font-weight: 500;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 1px;
            background-color: var(--border-color);
        }
    }

    &__item {
        position: relative;
        width: fit-content;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 20px;
        cursor: pointer;

        &:not(:first-child) {
            margin-left: 50px;
        }

        .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 0;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            background-color: var(--primary);
        }

        &:hover:after, &.is-active:after {
            height: 4px;
            transition: height 0.25s;
        }
    }

    &__content {
        height: 100%;
    }
}
</style>
