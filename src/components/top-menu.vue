<template>
    <div class="top-menu-wrapper">
        <div class="top-menu">
            <div class="fp-components-tabcontainer">
                <div>
                    <div v-for="tab in tabs" :key="tab.name" id="tabWrapper" class="fp-components-tabcontainer-tabbar">
                        <component :is="tab" :key="tab.name"></component>
                    </div>
                    <div @click="newTab()" class="top-menu__button fp-components-tabcontainer-sidebutton fp-components-tabcontainer-sidebutton-active">
                        <div>+</div>
                    </div>
                    <div class="fp-components-tabcontainer-dynspace"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ComponentService from './../js/modules/componentService';
import Api from './../js/modules/services/api';
import { defineComponent, createVNode } from 'vue';
import FpTab from './fp-tab.vue';

export default {
    name: 'top-menu',
    props: {},
    components: {
        FpTab,
    },
    data() {
        return {
            counter: 0,
            tabs: [],
        };
    },
    created() {
        this.newTab();
    },
    mounted() {
        this.eventBus.on('setActiveTab', (id) => {
            this.setActiveState(id);
        });
        this.eventBus.emit('createWorkspace', this.tabs[0].props.id);
        Api.openProject(this.openProject);
        Api.saveProject(this.packTabs);
        Api.buildProject(this.packTabs);
    },
    methods: {
        newTab: function (newId, newName) {
            if (this.counter === 5) return;
            const componentDefinition = defineComponent(FpTab);
            const component = createVNode(componentDefinition, {
                id: newId ? newId : ComponentService.idGenerator(5),
                active: true,
                tabName: newName ? newName : 'New Tab',
                closeTab: this.closeTab,
            });

            this.tabs.push(component);
            this.counter = this.tabs.length;
            this.eventBus.emit('createWorkspace', component.props.id);
            this.setActiveState(component.props.id);
        },
        closeTab: function (id) {
            this.tabs.forEach((tab) => {
                if (tab.props.id === id) {
                    this.eventBus.emit('closeWorkspace', id);
                    this.tabs.pop(tab);
                }
            });
        },
        setActiveState: function (id) {
            this.tabs.forEach((tab) => (tab.props.id === id ? (tab.props.active = true) : (tab.props.active = false)));
            this.eventBus.emit('setActiveWorkspace', id);
            this.$forceUpdate();
        },
        openProject: function (newTabs) {
            this.tabs?.forEach((tab) => this.closeTab(tab.props.id));
            newTabs?.forEach((newTab) => this.newTab(newTab.id, newTab.name));
        },
        packTabs: function () {
            const tabs = [];
            this.tabs?.forEach((tab) =>
                tabs.push({
                    id: tab.props.id,
                    name: tab.props.tabName,
                })
            );
            return tabs;
        },
    },
};
</script>
