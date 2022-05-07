<template>
    <div class="workspace" @click="deselectComponent"></div>
    <ComponentContextMenu :onClick="openPropertyMenu" />
    <component :is="propMenu.component" v-bind="propMenu.props" />
</template>

<script>
import ComponentContextMenu from './c-context-menu.vue';
import ComponentPropertyMenu from './c-property-menu.vue';
import ComponentService from './../js/modules/componentService';

export default {
    name: 'workspace',
    components: {
        ComponentContextMenu,
        ComponentPropertyMenu,
    },
    props: {
        init: Function,
    },

    data() {
        return {
            propMenu: {
                component: 'ComponentPropertyMenu',
                props: {
                    rendered: false,
                },
            },
            workspaces: [],
            activeWorkspace: '',
            components: [],
        };
    },

    beforeCreate() {
        this.eventBus.on('createWorkspace', (id) => {
            this.workspaces.push(id);
            this.activeWorkspace = id;
            this.$forceUpdate();
        });
    },

    mounted() {
        this.eventBus.on('setActiveWorkspace', (id) => {
            this.setActiveWorkspace(id);
        });
        this.eventBus.on('closeWorkspace', (id) => {
            this.closeWorkspace(id);
        });
        this.$props.init(this.updateComponentList);
        this.copyComponent();
        this.pasteComponent();
        this.removeComponent();
    },

    updated() {
        this.filterComponents(this.activeWorkspace);
    },

    watch: {
        activeWorkspace(newId, oldId) {
            document.querySelector('.workspace').setAttribute('id', newId);
        },
        workspaces: {
            deep: true,
            handler(newArray) {
                window.workspaces = [...newArray];
            },
        },
    },

    methods: {
        openPropertyMenu: function () {
            this.propMenu = {
                component: 'ComponentPropertyMenu',
                props: {
                    rendered: true,
                    component: window.activeComponent,
                    close: this.closePropertyMenu,
                },
            };
        },
        closePropertyMenu: function () {
            this.propMenu = {
                component: 'ComponentPropertyMenu',
                props: {
                    rendered: false,
                },
            };
        },
        copyComponent: function () {
            window.addEventListener('keydown', (e) => {
                if ((e.ctrlKey && e.key === 'c') || (e.metaKey && e.key === 'c')) {
                    window.clipBoard = window.activeComponent;
                }
            });
        },
        pasteComponent: function () {
            window.addEventListener('keydown', (e) => {
                if ((e.ctrlKey && e.key === 'v') || (e.metaKey && e.key === 'v')) {
                    if (window.clipBoard) {
                        ComponentService.componentClone(window.clipBoard);
                    }
                }
            });
        },
        removeComponent: function () {
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Delete') {
                    if(window.activeComponent) {
                        window.activeComponent.remove();
                    }
                }
            });
        },
        deselectComponent: function (e) {
            if (e.target === e.currentTarget) {
                ComponentService.changeActiveState();
            }
        },
        setActiveWorkspace: function (id) {
            var active;
            this.workspaces.forEach((item) => (item === id ? (active = id) : false));
            this.activeWorkspace = active;
            this.$forceUpdate();
        },
        closeWorkspace: function (id) {
            this.components.forEach((component) => (component.componentConfig.workspaceId === id ? component.remove() : false));
            this.workspaces.forEach((workspace) => (workspace === id ? this.workspaces.pop(workspace) : false));
        },
        updateComponentList: function () {
            this.components = window.components;
            this.$forceUpdate();
        },
        filterComponents: function (activeWorkspace) {
            this.components.forEach((component) =>
                component.componentConfig.workspaceId === activeWorkspace ? (component.style.display = 'flex') : (component.style.display = 'none')
            );
        },
    },
};
</script>
