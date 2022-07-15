<template>
    <BaseLayout>
        <Ribbon/>
        <Workspace/>
        <ControlPanel/>
    </BaseLayout>
</template>

<script setup lang="ts">
     // * imports
     import Ribbon from '@components/Ribbon/Ribbon.vue'
     import Workspace from '@components/Workspace/Workspace.vue'
     import ControlPanel from '@components/ControlPanel/ControlPanel.vue'
     import BaseLayout from '@layouts/BaseLayout.vue'
    //  import from '@sass/main.scss'


</script>

<style lang="scss">
@import './sass/main.scss';
</style>
