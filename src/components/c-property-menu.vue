<template>
  <div class="c-property-menu">
    <form action="javascript:void(0);" id="c-property-form">
      <div class="c-property-menu__inner">
        <div class="tabs">
          <div class="tabs-item is-selected" name="basic">Basic</div>
          <div class="tabs-item" name="action-callback">Action/Callback</div>
        </div>
        <div class="c-property-menu__content" name="basic">
          <div class="input input-fullWidth">
            <input
              placeholder="Component Text"
              type="text"
              name="component-text"
            />
          </div>
          <label class="label" for="component-target">Component Target</label>
          <div class="select select-fullWidth">
            <select name="component-target">
              <option value=""></option>
              <option value="signal">Signal</option>
              <option value="rapid">Rapid Variable</option>
            </select>
          </div>
          <div class="input input-fullWidth">
            <input
              placeholder="Target Path"
              type="text"
              name="component-path"
            />
          </div>
        </div>
        <div class="c-property-menu__content hide" name="action-callback">
          <label class="label" for="component-action">Component Action</label>
          <div class="select select-fullWidth">
            <select name="component-action">
              <option value=""></option>
              <option value="increase-value">Increase Value</option>
              <option value="decrease-value">Decrease Value</option>
              <option value="set-value">Set Value</option>
              <option value="push-signal">Push Signal</option>
              <option value="toggle-signal">Toggle Signal</option>
            </select>
          </div>
          <label class="label" for="component-callback"
            >Component Callback</label
          >
          <div class="select select-fullWidth">
            <select name="component-callback">
              <option value=""></option>
              <option value="increase-value">Increase Value</option>
              <option value="decrease-value">Decrease Value</option>
              <option value="set-value">Set Value</option>
              <option value="push-signal">Push Signal</option>
              <option value="toggle-signal">Toggle Signal</option>
            </select>
          </div>
          <div class="input input-fullWidth">
            <input placeholder="Alert Title" type="text" name="component-alertTitle" />
          </div>
          <div class="input input-fullWidth">
            <input placeholder="Alert Message" type="text" name="component-alertMessage" />
          </div>
          <div class="input input-fullWidth">
            <input placeholder="Step" type="number" name="component-step" />
          </div>
        </div>
        <div class="c-property-menu__buttons">
          <div class="button button--primary" data-btn-type="cancel">
            Cancel
          </div>
          <button class="button button--primary" data-btn-type="save">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "c-property-menu",
  props: {},
};
</script>