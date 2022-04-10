<template>
  <div
    class="fp-components-base fp-components-toggle draggable"
    data-type="toggle"
    data-text="Toggle"
  >
    <div class="fp-components-toggle-on" style="padding: 12px 32px 12px 8px">
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
</template>

<script>
export default {
  name: "fp-toggle",
  props: {},
};
</script>