<template>
  <div class="workspace"></div>
  <ComponentContextMenu/>
  <ComponentProperyMenu/>
</template>

<script>
import ComponentContextMenu from './c-context-menu.vue'
import ComponentProperyMenu from './c-property-menu.vue'

export default {
  name: 'workspace',
  components: {
    ComponentContextMenu,
    ComponentProperyMenu
  },
  props: {}
};
</script>