<template>
    <div ref="workspaceRef"
         class="workspace"
    >
        <h1>Layout</h1>
        <h2>Layout</h2>
        <div v-for="(fpComponent, index) in fpComponents" :key="index">
            <component :is="FpComponent" :type="fpComponent.type" :positionX="fpComponent.position.x"
                       :positionY="fpComponent.position.y" is-fixed></component>
        </div>
        <Modal v-model="showModal">
            <!-- <template #header>
                <h3>Some title!</h3>
            </template> -->
            <TabWrapper>
                <TabContent title="General">
                    <div class="field">
                        <label class="label">Content 1</label>
                        <input class="text-field" type="text"/>
                    </div>
                </TabContent>
                <TabContent title="Actions" icon="vite">
                    <div class="field">
                        <label class="label">Content 2</label>
                        <input class="text-field" type="text"/>
                    </div>
                    <div class="field">
                        <label class="label">Content 2</label>
                        <input class="text-field" type="text"/>
                    </div>
                </TabContent>
                <TabContent title="Alerts">
                    <div class="field">
                        <label class="label">Content 3</label>
                        <input class="text-field" type="text"/>
                    </div>
                    <div class="field">
                        <label class="label">Content 3</label>
                        <input class="text-field" type="text"/>
                    </div>
                    <div class="field">
                        <label class="label">Content 3</label>
                        <input class="text-field" type="text"/>
                    </div>
                </TabContent>
            </TabWrapper>
        </Modal>
        <Button @click="showModal = true">Show modal</Button>
    </div>
</template>

<script setup lang="ts">
// * imports
import { onMounted, ref, watch } from 'vue'
import { useWorkspaceStore } from '@stores/workspace'
import Modal from '@components/ui/OsModal.vue'
import Button from '@components/ui/OsButton.vue'
import FpComponent from '@components/ui/FpComponent.vue'

import TabWrapper from '@components/tabs/OsTabWrapper.vue'
import TabContent from '@components/tabs/OsTabContent.vue'
import type { fpComponent } from '@/types/fpComponent';

// * modal
const showModal = ref<boolean>(false)

// set ref
const workspaceStore = useWorkspaceStore()
const workspaceRef = ref<HTMLElement | null>(null)
onMounted(() => workspaceStore.setRef(workspaceRef.value))
watch(workspaceRef, (newValue, oldValue) => {
    if (newValue === oldValue) return
    workspaceStore.setRef(newValue)
})

// fp-components synchro
const fpComponents = ref<Array<fpComponent> | null>(null)
onMounted(() => {
    fpComponents.value = workspaceStore.getComponents()
})
</script>

<style lang="scss" scoped>
.workspace {
    position: relative;
    width: 100%;
    height: calc(100vh - var(--ribbon-height));
    background-color: var(--bg-color);
    border-top-right-radius: var(--corner-radius);
}
</style>
