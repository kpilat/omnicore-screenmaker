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
          <FpToggle />
        </div>

        <div class="right-menu__item">
          <FpInput />
        </div>

        <div class="right-menu__item">
          <FpRadio />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FpButton from "./fp-button.vue";
import FpDigital from "./fp-digital.vue";
import FpSwitch from "./fp-switch.vue";
import FpToggle from "./fp-toggle.vue";
import FpInput from "./fp-input.vue";
import FpRadio from "./fp-radio.vue";

export default {
  name: "right-menu",
  props: {},
  components: {
    FpButton,
    FpDigital,
    FpSwitch,
    FpToggle,
    FpInput,
    FpRadio,
  },
};
</script>
