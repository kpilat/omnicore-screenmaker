<template>
    <div class="ribbon">
        <div class="ribbon__tabs">
            <TransitionGroup>
                <component
                    v-for="tab in workspaceTabs.tabs"
                    :key="tab.title"
                    :is="tab.tab"
                    :componentId="tab.componentId"
                    :title="tab.title"
                    :isActive="tab.isActive"
                    @click="workspaceTabs.setActive(tab)"
                    @closeTab="workspaceTabs.closeTab(tab)"
                />
            </TransitionGroup>
            <div
                class="ribbon__tabs-button"
                @click="workspaceTabs.createNewTab()"
                v-if="workspaceTabs.count < 5"
            >
                <SvgIcon name="plus"/>
            </div>
        </div>
        <div class="ribbon__nav">
            <div
                @click="setActiveTab(0)"
                class="ribbon__nav-item"
                :class="{ 'is-active': controlPanelTabs.activeTab === 0 }"
            >
                <SvgIcon name="settings"/>
            </div>
            <div
                @click="setActiveTab(1)"
                class="ribbon__nav-item"
                :class="{ 'is-active': controlPanelTabs.activeTab === 1 }"
            >
                <SvgIcon name="components" class="ribbon__icon" color="#000"/>
            </div>
            <div
                @click="setActiveTab(2)"
                class="ribbon__nav-item"
                :class="{ 'is-active': controlPanelTabs.activeTab === 2 }"
            >
                <SvgIcon name="vite" class="ribbon__icon" color="#000"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// * imports
import { onBeforeMount } from 'vue'
import SvgIcon from '@components/OsSvgIcon.vue'
import { useControlPanelTabsStore } from '@stores/controlPanelTabs'
import { useWorkspaceTabsStore } from '@stores/workspaceTabs'

// workspace tabs
const workspaceTabs = useWorkspaceTabsStore()
workspaceTabs.createNewTab()

// * navigation tabs
const controlPanelTabs = useControlPanelTabsStore()
const setActiveTab = (id: number) => controlPanelTabs.setActive(id)
onBeforeMount(() => controlPanelTabs.setActive(0))
</script>

<style lang="scss" scoped>
.ribbon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: var(--ribbon-height);
    background-color: var(--bg-color);
    border-bottom: 2px solid var(--border-color);

    // electron window behavior
    -webkit-user-select: none;
    -webkit-app-region: drag;

    & *:not(.ribbon__tabs) {
        -webkit-app-region: no-drag;
    }

    &__tabs {
        position: relative;
        display: flex;
        width: 100%;
        padding: 4px 0;
        padding-left: 10px;
        margin-left: 120px;

        &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 1px;
            height: 70%;
            background-color: var(--border-color);
        }
    }

    &__tabs-button {
        min-width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--border-radius);
        border: 1px solid var(--primary);
        // background-color: var(--gray-light);
        cursor: pointer;
        transition: all 0.25s;
        z-index: +1;

        .icon {
            width: 12px;
            height: 100%;
        }

        &:hover {
            background-color: var(--primary);

            .icon {
                color: #fff;
            }
        }
    }

    &__nav {
        position: relative;
        display: flex;
        justify-content: space-evenly;
        margin-left: auto;
        min-width: 290px;

        &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 1px;
            height: 70%;
            background-color: var(--border-color);
        }
    }

    &__nav-item {
        position: relative;
        width: fit-content;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;

        .icon {
            width: 20px;
            height: 20px;
        }

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: max(40%, 35px);
            height: 0;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            background-color: var(--primary);
        }

        &:hover:after,
        &.is-active:after {
            height: 4px;
            transition: height 0.25s;
        }
    }
}
</style>
