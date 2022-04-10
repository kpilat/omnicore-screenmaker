const subscribeVariable = (component) => {
    const template = `
        try {
            ${component.id + component.id} = await RWS.Rapid.getData("${
        component.robotName
    }", "${component.moduleName}", "${component.targetName}");

            ${component.type === "input" ? inputCallback(component) : ""}

            await ${component.id + component.id}.subscribe(true);
        } catch(e) {
            FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find Rapid variable with name ${
                component.targetName
            }\`]);
        }
    `;
    return template;
};

const subscribeVariableRadio = (component) => {
    const template = `
        try {
          ${component.group}.${
        component.id + component.id
    } = await RWS.Rapid.getData("${component.robotName}", "${component.moduleName}", "${component.targetName}");

            await ${component.group}.${
        component.id + component.id
    }.subscribe(true);
        } catch(e) {
            FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find Rapid variable with name ${component.targetName}\`]);
        }
    `;
    return template;
};

const subscribeSignal = (component) => {
    const template = `
        try {
            ${component.id + component.id} = await RWS.IO.getSignal('${
        component.targetName
    }');
            await ${component.id + component.id}.subscribe(true);
        } catch(e) {
            FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find I/O with name ${
                component.targetName
            }\`]);
        }
    `;
    return template;
};

const increaseValue = (component) => {
    const template = `
        let value = await ${component.id + component.id}.getValue();
        value = Number.parseInt(value);
        value += ${component.step};
        try {
            await ${component.id + component.id}.setValue(value);
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }
    `;
    return template;
};

const decreaseValue = (component) => {
    const template = `
        let value = await ${component.id + component.id}.getValue();
        value = Number.parseInt(value);
        value -= ${component.step};
        try {
            await ${component.id + component.id}.setValue(value);
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }
    `;
    return template;
};

const toggleSignal = (component) => {
    if (component.type === "digital") {
        return toggleSignalDigital(component);
    } else if (component.type === "switch") {
        return toggleSignalSwitch(component);
    } else {
        return toggleSignalButton(component);
    }
};

const toggleSignalDigital = (component) => {
    const template = `
        var setValue = ${component.id}.active ? 0 : 1;
        ${component.id}.active = !${component.id}.active
        try {
            await ${component.id + component.id}.setValue(setValue);
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }
    `;
    return template;
};

const toggleSignalSwitch = (component) => {
    const template = `
          var setValue = ${component.id}.active ? 1 : 0;
          try {
              await ${component.id + component.id}.setValue(setValue);
          } catch (e) {
              FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
          }
      `;
    return template;
};

const toggleSignalButton = (component) => {
    const template = `
        try {
            var setValue;
            if (${component.id}.active) {
                setValue = ${component.id}.active;
            } else {
                setValue = await ${component.id + component.id}.getValue();
                ${component.id}['active'] = setValue;
            }

            setValue = setValue === 0 ? 1 : 0;
            ${component.id}.active = setValue;
            await ${component.id + component.id}.setValue(setValue);
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }
    `;
    return template;
};

const setValue = (component) => {
    const template = `
        let value = await ${component.id + component.id}.getValue();
        try {
            await ${component.id + component.id}.setValue(!value);
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }
    `;
    return template;
};

const setString = (component) => {
    const template = `
    try {
      await ${component.id + component.id}.setValue(newValue);
    } catch (e) {
        FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
    }
  `;
    return template;
};

const alertPopup = (component) => {
    const template = `
        FPComponents.Popup_A.confirm('${component.alertTitle}', '${
        component.alertMessage
    }', async function (action) {
            if (action == FPComponents.Popup_A.OK) {
                ${
                    component.action === "increase-value"
                        ? increaseValue(component)
                        : ""
                }
                ${
                    component.action === "decrease-value"
                        ? decreaseValue(component)
                        : ""
                }
                ${component.action === "set-value" ? setValue(component) : ""}
                ${
                    component.action === "toggle-signal"
                        ? toggleSignal(component)
                        : ""
                }
                ${component.action === "set-string" ? setString(component) : ""}
            }
            ${component.type === "switch" ? alertElseSwitch(component) : ""}
            ${component.type === "input" ? alertElseInput(component) : ""}
        }, FPComponents.Popup_A.STYLE.${component.alertType});
    `;
    return template;
};

// Assuming that this part is being used in switch event callbback because a variable
// from switch onChange event listener is being used here
const alertElseSwitch = (component) => {
    const template = `
        else {
            try {
                ${component.id}.active = !active;
            } catch (e) {
                FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
            }
        }
    `;
    return template;
};

const alertElseInput = (component) => {
    const template = `
        else {
          ${component.id}.text = ${component.id}.prevText;
        }
    `;
    return template;
};

const inputCallback = (component) => {
    const template = `
      ${
          component.id + component.id
      }.addCallbackOnChanged(async function (value) {
        var val = await ${component.id + component.id}.getValue();
        ${component.id}.text = val;
        ${component.id}['prevText'] = val;
      });
  `;
    return template;
};

export default {
    subscribeVariable,
    subscribeVariableRadio,
    subscribeSignal,
    increaseValue,
    decreaseValue,
    toggleSignal,
    setValue,
    alertPopup,
    setString,
};
