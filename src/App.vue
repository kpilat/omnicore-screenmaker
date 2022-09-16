<template>
    <BaseLayout>
        <OsRibbon/>
        <OsWorkspace ref="workspaceRef"/>
        <OsControlPanel/>
    </BaseLayout>
</template>

<script setup lang="ts">
// * imports
import OsRibbon from '@components/ribbon/OsRibbon.vue'
import OsWorkspace from '@components/workspace/OsWorkspace.vue'
import OsControlPanel from '@components/controlPanel/OsControlPanel.vue'
import BaseLayout from '@layouts/BaseLayout.vue'
</script>

<style lang="scss">
@import './sass/main.scss';
</style>
