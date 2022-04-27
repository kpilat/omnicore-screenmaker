<template>
    <div class="top-menu-wrapper">
        <div class="top-menu">
            <div class="fp-components-tabcontainer">
                <div>
                    <div v-for="tab in tabs" :key="tab.name" id="tabWrapper" class="fp-components-tabcontainer-tabbar">
                        <component :is="tab" :key="tab.name"></component>
                    </div>
                    <div :onclick="newTab" class="top-menu__button fp-components-tabcontainer-sidebutton fp-components-tabcontainer-sidebutton-active">
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
    },
    methods: {
        newTab: function () {
            if (this.counter === 5) return;
            const componentDefinition = defineComponent(FpTab);
            const component = createVNode(componentDefinition, {
                id: ComponentService.idGenerator(5),
                active: true,
                tabName: 'New Tab',
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
    },
};
</script>
