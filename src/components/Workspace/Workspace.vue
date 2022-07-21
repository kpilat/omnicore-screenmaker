<template>
    <div class="workspace">
        <h1>Layout</h1>
        <h2>Layout</h2>
        <Modal/>
    </div>
</template>

<script setup lang="ts">
// * imports
import Modal from '@components/ui/Modal.vue'
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
