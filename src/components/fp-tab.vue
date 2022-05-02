<template>
    <div @click="setActiveState" class="top-menu__tab" :class="{ [activeClass]: active }">
        <div></div>
        <div>
            <div>
                <div class="tab__text" @dblclick="changeName">{{ tabName }}</div>
            </div>
            <div></div>
        </div>
        <div></div>
        <div @click="closeTab(id)" class="top-menu__cross">
            <div>X</div>
        </div>
    </div>
</template>

<script>
import Utilities from './../js/modules/utilities';

export default {
    name: 'fp-tab',
    props: {
        id: String,
        active: Boolean,
        tabName: String,
        closeTab: Function,
    },
    data() {
        return {
            activeClass: 'fp-components-tabcontainer-activetab fp-components-tabcontainer-activetab-noclose',
        };
    },
    methods: {
        setActiveState: function () {
            this.eventBus.emit('setActiveTab', this.$props.id);
        },
        changeName: function () {
            this.eventBus.emit('changeTabName', {
                id: this.$props.id,
                tabName: this.$props.tabName,
            });
        },
    },
};
</script>
