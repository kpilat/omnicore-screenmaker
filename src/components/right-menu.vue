<template>
    <div class="right-menu-wrapper">
        <div class="right-menu">
            <div class="right-menu__category">
                <div class="tabs">
                    <div @click="switchTab" class="tabs-item" v-bind:class="[tabRender === 'general' ? activeClass : '']">General</div>
                    <div @click="switchTab" class="tabs-item" v-bind:class="[tabRender === 'toolbox' ? activeClass : '']">ToolBox</div>
                </div>
            </div>
            <div v-if="tabRender === 'general'" class="right-menu__content">
                <div class="right-menu__item">
                    <label class="label" for="component-target">App Name</label>
                    <div class="input input-fullWidth">
                        <input v-model="appName" placeholder="App Name" type="text" />
                    </div>
                </div>
            </div>
            <div v-if="tabRender === 'toolbox'" class="right-menu__content">
                <div class="right-menu__item">
                    <FpButton />
                </div>

                <div class="right-menu__item">
                    <FpDigital />
                </div>

                <div class="right-menu__item">
                    <FpSwitch />
                </div>

                <div class="right-menu__item">
                    <FpInput />
                </div>

                <div class="right-menu__item">
                    <FpRadio />
                </div>

                <div class="right-menu__item">
                    <FpLabel />
                </div>
            </div>
        </div>
        <div class="right-menu__trash-wrapper">
            <div class="right-menu__perex">
                <p>Trash</p>
            </div>
            <div class="right-menu__trash">
                <div class="right-menu__icon">
                    <img src="./../../public/images/svg/trash.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FpButton from './fp-button.vue';
import FpDigital from './fp-digital.vue';
import FpSwitch from './fp-switch.vue';
import FpInput from './fp-input.vue';
import FpRadio from './fp-radio.vue';
import FpLabel from './fp-label.vue';

import Rescale from './../js/modules/rescale';

export default {
    name: 'right-menu',
    props: {},
    components: {
        FpButton,
        FpDigital,
        FpSwitch,
        FpLabel,
        FpInput,
        FpRadio,
    },
    data() {
        return {
            tabRender: 'general',
            activeClass: 'is-selected',
            appName: 'New App',
        };
    },
    watch: {
        appName: {
            handler() {
                window.appSettings = {
                    appName: this.appName,
                };
            },
        },
    },
    mounted() {
        this.eventBus.on('setAppName', () => {
            this.appName = window.appSettings?.appName;
        });
    },
    updated() {
        Rescale.rescaleComponents();
    },
    methods: {
        switchTab: function (e) {
            this.tabRender = e.target.innerHTML.toLowerCase();
        },
    },
};
</script>
