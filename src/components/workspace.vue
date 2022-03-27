<template>
  <div class="workspace"></div>
  <ComponentContextMenu :onClick="testConsole" />
  <component :is="propMenu.component" v-bind="propMenu.props" />
</template>

<script>
import ComponentContextMenu from "./c-context-menu.vue";
import ComponentPropertyMenu from "./c-property-menu.vue";

export default {
  name: "workspace",
  components: {
    ComponentContextMenu,
    ComponentPropertyMenu,
  },
  props: {},
  data() {
    return {
      propMenu: {
        component: "ComponentPropertyMenu",
        props: {
          isStartup: true,
        },
      },
    };
  },
  methods: {
    testConsole: function () {
      this.propMenu = {
        component: "ComponentPropertyMenu",
        props: {
          isStartup: false,
          component: window.activeComponent
        },
      };
    },
  },
};
</script>