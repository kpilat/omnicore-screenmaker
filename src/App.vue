<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="content-wrapper">
    <TopMenu/>
    <Workspace/>
    <RightMenu/>
  </div>

</template>

<script>
/* eslint-disable vue/no-unused-components */
import Button from './components/button.vue'
import TopMenu from './components/top-menu.vue'
import RightMenu from './components/right-menu.vue'
import Workspace from './components/workspace.vue'

import DragNDrop from './js/modules/dragNDrop'
import Rescale from './js/modules/rescale'
import WorkSpace from './js/modules/workSpace'
import ComponentParser from './js/modules/componentParser'

export default {
  name: 'App',
  components: {
    TopMenu,
    RightMenu,
    Workspace,
    Button
  },
  mounted: () => {
    DragNDrop.init();
    Rescale.init();
    WorkSpace.init();
    ComponentParser.init();
  }
}
</script>
