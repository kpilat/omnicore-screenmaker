// Initializes the given component according its type
import Components from "./componentTempl";

const componentInit = (component) => {
  switch (component.type) {
    case "button":
      return Components.buttonInit(component);
    case "digital":
      return Components.digitalInit(component);
    case "switch":
      return Components.switchInit(component);
    case "toggle":
      return Components.toggleInit(component);
    case "input":
      return Components.inputInit(component);
    case "input":
      return Components.inputInit(component);
    case "radio":
      return Components.radioInit(component);
    default:
      return undefined;
  }
};

// Inserting parts of code to actual template
const injectTemplate = (components) => {
  const code = `
        ${components.componentGroups}
        ${components.componentVariables}
        window.addEventListener("load", async function () {
            fpComponentsEnableLog();
            try {
                    ${components.componentCode}
                } catch (e) {
            var err = JSON.stringify(e);
            console.log(err);
            console.log(e);
            FPComponents.Popup_A.message("Something went wrong!", "Application might not work as intended");
            }
            this.initView();
        });
    
        var initView = function () {
        var mainView = document.getElementById("io-view");
        mainView.style.display = "flex";
        mainView.style.position = "relative";
        }
        var appActivate = async function () {
            ${components.componentSubscribe}
            return true;
        }
        
        var appDeactivate = async function () {
            ${components.componentUnsubscribe}
            return true;
        }
    `;

  return code;
};

// Values subscribe part of code
const subscribe = (component) => {
  return `
    if (${component.id + component.id}) {
        await ${component.id + component.id}.subscribe(true);
    }
    `;
};

// Values unsubscribe part of code
const unsubscribe = (component) => {
  return `
    if (${component.id + component.id}) {
        await ${component.id + component.id}.unsubscribe();
    }
    `;
};

// Parts of code from array is being put together as longer string
const stringJoin = (input) => {
  const components = {
    componentCode: "",
    componentVariables: "",
    componentGroups: "",
    componentSubscribe: "",
    componentUnsubscribe: "",
  };

  input.componentCode.forEach((item) => {
    components.componentCode += item;
  });
  input.componentGroups.forEach((item) => {
    components.componentGroups += item;
  });
  input.componentVariables.forEach((item) => {
    components.componentVariables += item;
  });
  input.componentSubscribe.forEach((item) => {
    components.componentSubscribe += item;
  });
  input.componentUnsubscribe.forEach((item) => {
    components.componentUnsubscribe += item;
  });
  return components;
};

export default {
  componentInit,
  injectTemplate,
  subscribe,
  unsubscribe,
  stringJoin,
};
