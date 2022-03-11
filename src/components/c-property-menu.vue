<template>
  <div class="c-property-menu">
    <div class="tabs">
      <div class="tabs-item is-selected" name="signal">Signal</div>
      <div class="tabs-item" name="rapid">Rapid Variable</div>
    </div>
    <div class="c-property-menu__content" name="signal">
      <div class="input input-fullWidth">
        <input placeholder="Signal Name" type="text" data-type="signal" />
      </div>
    </div>
    <div class="c-property-menu__content" name="rapid">
      <div class="input input-fullWidth">
        <input placeholder="Rapid Variable Name" type="text" data-type="signal" />
      </div>
    </div>
    <div class="c-property-menu__buttons">
      <button class="button button--primary">Cancel</button>
      <button class="button button--primary">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "c-property-menu",
  props: {},
};
</script>