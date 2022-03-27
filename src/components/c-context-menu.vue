<template>
  <div class="c-context-menu hide">
    <div class="c-context-menu__item" data-action="delete">
      Remove component
    </div>
    <div class="c-context-menu__item" data-action="properties" :onclick="onClick">
      Properties
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-context-menu',
  props: {
    onClick: Function
  }
};
</script>