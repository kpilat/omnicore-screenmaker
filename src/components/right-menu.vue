<template>
  <div class="right-menu-wrapper">
    <div class="right-menu">
      <div class="right-menu__category">
        <button class="button button--category is-active">ToolBox</button>
        <button class="button button--category">Something</button>
      </div>
      <div class="right-menu__content">
        <div class="right-menu__item">
          <div id="normal-button" class="fp-components-button draggable">Button</div>
        </div>
        <div class="right-menu__item">
          <div id="normal-button" class="fp-components-button draggable">Button</div>
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