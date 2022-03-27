<template>
  <div class="workspace"></div>
  <ComponentContextMenu :onClick="openPropertyMenu" />
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
          visible: false,
        },
      },
    };
  },
  methods: {
    openPropertyMenu: function () {
      this.propMenu = {
        component: "ComponentPropertyMenu",
        props: {
          visible: true,
          component: window.activeComponent,
          close: this.closePropertyMenu
        },
      };
    },
    closePropertyMenu: function () {
      this.propMenu = {
        component: "ComponentPropertyMenu",
        props: {
          visible: false,
        },
      };
    },
  },
};
</script>