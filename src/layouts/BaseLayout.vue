<template>
    <div class="base-layout">
        <div class="base-layout__inner">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
// * imports
</script>

<style lang="scss" scoped>
.base-layout {
    --border: 15px;
    --border-radius: 10px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    padding: var(--border);
    border-radius: var(--border-radius);

    &__inner {
        padding-top: var(--ribbon-height);
        position: relative;
        display: flex;
        overflow: hidden;
        border-radius: var(--border-radius);
        height: 100%;
    }
}
</style>
