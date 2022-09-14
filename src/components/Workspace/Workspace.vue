<template>
    <div class="workspace">
        <h1>Layout</h1>
        <h2>Layout</h2>
        <Modal v-model="showModal">
            <!-- <template #header>
                <h3>Some title!</h3>
            </template> -->
            <TabWrapper>
                <TabContent title="General">
                    <div class="field">
                        <label class="label">Content 1</label>
                        <input class="text-field" type="text" />
                    </div>
                </TabContent>
                <TabContent title="Actions" icon="vite">
                    <div class="field">
                        <label class="label">Content 2</label>
                        <input class="text-field" type="text" />
                    </div>
                    <div class="field">
                        <label class="label">Content 2</label>
                        <input class="text-field" type="text" />
                    </div>
                </TabContent>
                <TabContent title="Alerts">
                    <div class="field">
                        <label class="label">Content 3</label>
                        <input class="text-field" type="text" />
                    </div>
                    <div class="field">
                        <label class="label">Content 3</label>
                        <input class="text-field" type="text" />
                    </div>
                    <div class="field">
                        <label class="label">Content 3</label>
                        <input class="text-field" type="text" />
                    </div>
                </TabContent>
            </TabWrapper>
        </Modal>
        <Button @click="showModal = true">Show modal</Button>
    </div>
</template>

<script setup lang="ts">
// * imports
import { ref } from 'vue'
import Modal from '@components/ui/OsModal.vue'
import Button from '@components/ui/OsButton.vue'

import TabWrapper from '@components/tabs/OsTabWrapper.vue'
import TabContent from '@components/tabs/OsTabContent.vue'

// * modal
const showModal = ref<boolean>(false)
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
