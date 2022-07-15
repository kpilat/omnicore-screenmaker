<template>
    <div class="control-panel">
        <Module/>
    </div>
</template>

<script setup lang="ts">
// * imports
import Module from '@components/ControlPanel/Module.vue'
</script>

<style lang="scss" scoped>
.control-panel:v-deep {
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
