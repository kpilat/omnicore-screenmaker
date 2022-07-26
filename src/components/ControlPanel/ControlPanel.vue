<template>
    <div class="control-panel">
        <div v-show="controlPanelTabs.activeTab === 0" class="control-panel__content">
            <Module :defaultState="true" label="General settings">
                <div class="field">
                    <label class="label">App name</label>
                    <input class="text-field" type="text" />
                </div>
                <div class="field">
                    <label class="label">App name</label>
                    <input class="text-field" type="text" />
                </div>
            </Module>
        </div>

        <div v-show="controlPanelTabs.activeTab === 1" class="control-panel__content">
            <Module :defaultState="true" label="General settings">
                <div class="field">
                    <label class="label">App name</label>
                    <input class="text-field" type="text" />
                </div>
                <div class="field">
                    <label class="label">App name</label>
                    <input class="text-field" type="text" />
                </div>
            </Module>
            <Module :defaultState="true" label="General settings">
                <div class="field">
                    <label class="label">App name</label>
                    <input class="text-field" type="text" />
                </div>
                <div class="field">
                    <label class="label">App name</label>
                    <input class="text-field" type="text" />
                </div>
            </Module>
        </div>
    </div>
</template>

<script setup lang="ts">
// * imports
import { ref } from 'vue'
import Module from '@components/ControlPanel/Module.vue'
import { useControlPanelTabsStore } from '@stores/controlPanelTabs'

// * tabs
const controlPanelTabs = useControlPanelTabsStore()

</script>

<style lang="scss" scoped>
.control-panel {
    min-width: 290px;
    width: fit-content;
    height: calc(100vh - var(--ribbon-height));
    display: flex;
    flex-direction: column;
    background-color: var(--bg-color);
    border-left: 2px solid var(--border-color);
    border-top-left-radius: var(--corner-radius);
}
</style>
