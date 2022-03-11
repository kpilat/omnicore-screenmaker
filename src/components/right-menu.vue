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
          <div
            class="fp-components-button draggable"
            data-type="button"
            data-name="Button"
          >
            <span class="fp-components-button-text">Button</span>
          </div>
        </div>

        <div class="right-menu__item">
          <div
            class="fp-components-digital-a-container draggable"
            data-type="digital"
            data-name="Digital"
          >
            <div class="fp-components-digital-a">0</div>
            <div class="fp-components-digital-a-desc">Digital</div>
          </div>
        </div>

        <div class="right-menu__item">
          <div
            class="fp-components-switch-container draggable"
            data-type="switch"
            data-name="Switch"
          >
            <div class="fp-components-switch-button">
              <div></div>
            </div>
          </div>
        </div>

        <div class="right-menu__item">
          <div
            class="fp-components-base fp-components-toggle draggable"
            data-type="toggle"
            data-name="Toggle"
          >
            <div
              class="fp-components-toggle-on"
              style="padding: 12px 32px 12px 8px"
            >
              <div
                class="fp-components-toggle-icon"
                style="background-image: none"
              ></div>
              <div>Value 0</div>
            </div>
            <div class="" style="padding: 12px 32px 12px 8px">
              <div
                class="fp-components-toggle-icon"
                style="background-image: none"
              ></div>
              <div>Value 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "right-menu",
  props: {},
};
</script>