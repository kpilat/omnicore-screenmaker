<template>
    <div class="right-menu-wrapper">
        <div class="right-menu">
            <div class="right-menu__category">
                <div class="tabs">
                    <div class="tabs-item is-selected">Tab 1</div>
                    <div class="tabs-item">Tab 2</div>
                    <div class="tabs-item">Tab 3</div>
                </div>
            </div>
            <div class="right-menu__content">
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
    </div>
</template>

<script>
import FpButton from "./fp-button.vue";
import FpDigital from "./fp-digital.vue";
import FpSwitch from "./fp-switch.vue";
import FpInput from "./fp-input.vue";
import FpRadio from "./fp-radio.vue";
import FpLabel from "./fp-label.vue";

export default {
    name: "right-menu",
    props: {},
    components: {
        FpButton,
        FpDigital,
        FpSwitch,
        FpLabel,
        FpInput,
        FpRadio,
    },
};
</script>
