<template>
    <div class="workspace" @click="deselectComponent"></div>
    <ComponentContextMenu :onClick="openPropertyMenu" />
    <component :is="propMenu.component" v-bind="propMenu.props" />
</template>

<script>
import ComponentContextMenu from "./c-context-menu.vue"
import ComponentPropertyMenu from "./c-property-menu.vue"
import ComponentService from "./../js/modules/componentService"

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
                    rendered: false,
                },
            },
        };
    },

    mounted() {
        // Catches data from main proces (Open project action)
        this.copyComponent();
        this.pasteComponent();
    },

    methods: {
        openPropertyMenu: function () {
            this.propMenu = {
                component: "ComponentPropertyMenu",
                props: {
                    rendered: true,
                    component: window.activeComponent,
                    close: this.closePropertyMenu,
                },
            };
        },
        closePropertyMenu: function () {
            this.propMenu = {
                component: "ComponentPropertyMenu",
                props: {
                    rendered: false,
                },
            };
        },
        copyComponent: function () {
            window.addEventListener("keydown", (e) => {
                if (
                    (e.ctrlKey && e.key === "c") ||
                    (e.metaKey && e.key === "c")
                ) {
                    window.clipBoard = window.activeComponent;
                }
            });
        },
        pasteComponent: function () {
            window.addEventListener("keydown", (e) => {
                if (
                    (e.ctrlKey && e.key === "v") ||
                    (e.metaKey && e.key === "v")
                ) {
                    if (window.clipBoard) {
                        ComponentService.componentClone(window.clipBoard);
                    }
                }
            });
        },
        deselectComponent: function (e) {
            if (e.target === e.currentTarget) {
                ComponentService.changeActiveState();
            }
        },
    },
};
</script>
