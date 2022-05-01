<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div class="content-wrapper">
        <TopMenu />
        <Workspace :init="this.workspaceInit" />
        <RightMenu />
    </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Button from './components/button.vue';
import TopMenu from './components/top-menu.vue';
import RightMenu from './components/right-menu.vue';
import Workspace from './components/workspace.vue';

import DragNDrop from './js/modules/dragNDrop';
import Rescale from './js/modules/rescale';
import WorkspaceService from './js/modules/workSpace';

export default {
    name: 'App',
    components: {
        TopMenu,
        RightMenu,
        Workspace,
        Button,
    },
    data() {
        return {
            workspaceInit: WorkspaceService.init
        }
    },
    beforeCreate() {},
    mounted() {
        DragNDrop.init();
        Rescale.init();
    },
};
</script>
