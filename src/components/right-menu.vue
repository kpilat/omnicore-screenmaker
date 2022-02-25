<template>
  <div class="right-menu-wrapper">
    <div class="right-menu">
      <div class="right-menu__category">
        <button class="button button--category is-active">ToolBox</button>
        <button class="button button--category">Something</button>
      </div>
      <div class="right-menu__content">
        <div class="right-menu__item">
          <div class="fp-components-button draggable" data-type="button" data-name="Button">
            <span class="fp-components-button-text">Button</span>
          </div>
        </div>
        <div class="right-menu__item">
          <div
            class="fp-components-digital-a-container draggable"
            data-type="digital" data-name="Digital">
            <div class="fp-components-digital-a">0</div>
            <div class="fp-components-digital-a-desc">Digital</div>
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