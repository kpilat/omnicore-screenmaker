<template>
  <div class="c-property-menu" v-if="rendered">
    <form action="javascript:void(0);" id="c-property-form">
      <div class="c-property-menu__inner">
        <!-- Tabs -->
        <div class="tabs">
          <div class="tabs-item is-selected" name="basic">Basic</div>
          <div class="tabs-item" name="action-callback">Action/Callback</div>
          <div class="tabs-item" name="alert">Alert</div>
        </div>

        <!-- Basic window -->
        <div class="c-property-menu__content" name="basic">
          <div
            class="input input-fullWidth"
            v-if="component.componentSettings.componentText"
          >
            <input
              v-model="componentText"
              placeholder="Component Text"
              type="text"
              name="component-text"
            />
          </div>
          <label class="label" for="component-target">Component Target</label>
          <div class="select select-fullWidth">
            <select name="component-target" v-model="targetType">
              <option value="">None</option>
              <option value="signal">Signal</option>
              <option value="rapid">Rapid Variable</option>
            </select>
          </div>
          <div class="input input-fullWidth" v-if="this.targetType === 'rapid'">
            <input
              v-model="robotName"
              placeholder="Robot Name"
              type="text"
              name="component-robotName"
            />
          </div>
          <div class="input input-fullWidth" v-if="this.targetType === 'rapid'">
            <input
              v-model="moduleName"
              placeholder="Module Name"
              type="text"
              name="component-moduleName"
            />
          </div>
          <div
            class="input input-fullWidth"
            v-if="this.targetType === 'signal' || this.targetType === 'rapid'"
          >
            <input
              v-model="targetName"
              placeholder="Target Name"
              type="text"
              name="component-targetName"
            />
          </div>
        </div>

        <!-- Action and Callback Window -->
        <div class="c-property-menu__content hide" name="action-callback">
          <label class="label" for="component-action">Component Action</label>
          <div class="select select-fullWidth">
            <select name="component-action" v-model="actionType">
              <option value="">None</option>
              <option value="increase-value">Increase Value</option>
              <option value="decrease-value">Decrease Value</option>
              <option value="set-value">Set Value</option>
              <option value="push-signal">Push Signal</option>
              <option value="toggle-signal">Toggle Signal</option>
              <option value="set-string">Set String</option>
            </select>
          </div>
          <div
            class="input input-fullWidth"
            v-if="
              this.actionType === 'increase-value' ||
              this.actionType === 'decrease-value'
            "
          >
            <input
              placeholder="Step"
              type="number"
              name="component-step"
              v-model="step"
            />
          </div>
          <label class="label" for="component-callback"
            >Component Callback</label
          >
          <div class="select select-fullWidth">
            <select name="component-callback" v-model="callbackType">
              <option value="">None</option>
              <option value="increase-value">Increase Value</option>
              <option value="decrease-value">Decrease Value</option>
              <option value="set-value">Set Value</option>
              <option value="push-signal">Push Signal</option>
              <option value="toggle-signal">Toggle Signal</option>
            </select>
          </div>
        </div>

        <!-- Alerts window -->
        <div class="c-property-menu__content hide" name="alert">
          <label class="label" for="component-alertType">Alert Type</label>
          <div class="select select-fullWidth">
            <select name="component-alertType" v-model="alertType">
              <option value="">None</option>
              <option value="INFORMATION">Information</option>
              <option value="WARNING">Warning</option>
              <option value="DANGER">Danger</option>
            </select>
          </div>
          <div class="input input-fullWidth" v-if="alertType">
            <input
              v-model="alertTitle"
              placeholder="Alert Title"
              type="text"
              name="component-alertTitle"
            />
          </div>
          <div class="input input-fullWidth" v-if="alertType">
            <input
              v-model="alertMessage"
              placeholder="Alert Message"
              type="text"
              name="component-alertMessage"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="c-property-menu__buttons">
          <div
            class="button button--primary"
            data-btn-type="cancel"
            :onclick="close"
          >
            Cancel
          </div>
          <button
            class="button button--primary"
            data-btn-type="save"
            :onclick="save"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import componentsPropertyMenu from "./../js/modules/componentPropertyMenu";

export default {
  name: "c-property-menu",
  props: {
    rendered: Boolean,
    close: Function,
    component: Object,
  },
  data: function () {
    return {
      targetType: "",
      actionType: "",
      alertType: "",
      callbackType: "",

      // Input values
      componentText: "",
      targetName: "",
      robotName: "",
      moduleName: "",
      alertTitle: "",
      alertMessage: "",
      step: "",
    };
  },
  methods: {
    save: () => {
      componentsPropertyMenu.saveConfig();
    },
    consoleLog: (text) => {
      console.log(text);
    },
    componentChange: function () {
      this.targetType = this.component.componentConfig.target;
      this.actionType = this.component.componentConfig.action;
      this.callbackType = this.component.componentConfig.callback;
      this.alertType = this.component.componentConfig.alertType;
      this.componentText = this.component.componentConfig.text;
      this.targetName = this.component.componentConfig.targetName;
      this.robotName = this.component.componentConfig.robotName;
      this.moduleName = this.component.componentConfig.moduleName;
      this.alertTitle = this.component.componentConfig.alertTitle;
      this.alertMessage = this.component.componentConfig.alertMessage;
      this.step = this.component.componentConfig.step;
    },
  },
  updated() {
    this.rendered ? componentsPropertyMenu.windowInit() : void 0;
  },
  watch: {
    rendered: {
      deep: true,
      // whenever property changes, this handler will run
      handler() {
        if (this.rendered) {
          this.componentChange();
        }
      },
    },

    component: {
      handler() {
        if(this.rendered) {
          this.componentChange();
        }
      },
    },
  },
};
</script>