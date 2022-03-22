const sendData = () => {
  const components = [];
  window.components?.forEach((component) => {
    const path = component.componentConfig.path.split("/");
    const objectComponent = {
      type: component.getAttribute("data-type"),
      id: component.componentConfig.id,
      name: component.getAttribute("data-name"),
      // Position
      top: component.style.top,
      left: component.style.left,
      // Data
      targetType: component.componentConfig.target,
      targetName: path[path.length - 1],
      // Location
      robotName: path[0],
      moduleName: path[1],
      // Other Parameters
      text: component.componentConfig.text,
      action: component.componentConfig.action,
      callback: component.componentConfig.callback,
      alertMessage: component.componentConfig.alertMessage,
      alertTitle: component.componentConfig.alertTitle,
      step: component.componentConfig.step,
    };
    Object.keys(objectComponent).forEach((key) => {
      if (objectComponent[key] === '' || objectComponent[key] === undefined) {
        delete objectComponent[key];
      }
    });
    components.push(objectComponent);
  });

  if (components.length > 0) {
    window.api.send("toMain", JSON.stringify(components));
  }
};

// Initialization
const init = () => {
  document.querySelector("#build-app").addEventListener("click", () => {
    sendData();
  });
};

export default { init };
