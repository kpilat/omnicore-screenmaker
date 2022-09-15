<template>
    <div class="control-panel">
        <div v-show="controlPanelTabs.activeTab === 0" class="control-panel__content">
            <OsModule :defaultState="true" label="General settings">
                <div class="field">
                    <label class="label">App name</label>
                    <input class="text-field" type="text"/>
                </div>
                <div class="field">
                    <label class="label">App name</label>
                    <input class="text-field" type="text"/>
                </div>
            </OsModule>
        </div>

        <div v-show="controlPanelTabs.activeTab === 1" class="control-panel__content">
            <OsModule :isExpandable="false" label="General components">
                <OsFlex direction="column">
                    <FpComponent type="button"/>
                    <FpComponent type="digital"/>
                    <FpComponent type="input"/>
                    <FpComponent type="label"/>
                    <FpComponent type="radio"/>
                    <FpComponent type="switch"/>
                </OsFlex>
            </OsModule>
        </div>
    </div>
</template>

<script setup lang="ts">
// * imports
import { ref } from 'vue'
import OsModule from '@components/controlPanel/OsModule.vue'
import { useControlPanelTabsStore } from '@stores/controlPanelTabs'
import FpComponent from '@components/ui/FpComponent.vue'
import OsFlex from '@components/ui/OsFlex.vue'

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
