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
import Custom from './js/custom.js'
import Button from './components/button.vue'
import TopMenu from './components/top-menu.vue'
import RightMenu from './components/right-menu.vue'
import Workspace from './components/workspace.vue'

export default {
  name: 'App',
  components: {
    TopMenu,
    RightMenu,
    Workspace,
    Button,
    Custom
  }
}
</script>
