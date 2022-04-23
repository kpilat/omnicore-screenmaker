const subscribeVariable = (component) => {
    const template = /*javascript*/ `
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
    const template = /*javascript*/ `
        try {
          ${component.radioGroup}.${
        component.id + component.id
    } = await RWS.Rapid.getData("${component.robotName}", "${
        component.moduleName
    }", "${component.targetName}");

            await ${component.radioGroup}.${
        component.id + component.id
    }.subscribe(true);
        } catch(e) {
            FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find Rapid variable with name ${
                component.targetName
            }\`]);
        }
    `;
    return template;
};

const subscribeSignal = (component) => {
    const template = /*javascript*/ `
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
    const template = /*javascript*/ `
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
    const template = /*javascript*/ `
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
    const template = /*javascript*/ `
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
    const template = /*javascript*/ `
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
    const template = /*javascript*/ `
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
    const template = /*javascript*/ `
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
    const template = /*javascript*/ `
    try {
      await ${component.id + component.id}.setValue(newValue);
    } catch (e) {
        FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
    }
  `;
    return template;
};

const setRadioButton = (component) => {
    const template = /*javascript*/ `
        try {
            await ${component.radioGroup}.${
        component.id + component.id
    }.setValue(true);
            ${component.radioGroup}.${component.id}.checked = true;
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }

        Object.entries(${component.radioGroup}).forEach(async (item) => {
            if ('${component.id + component.id}' !== item[0] && '${
        component.id
    }' !== item[0]) {
                if (item[0].split('_')[1].length > 5) {
                    try {
                        await item[1].setValue(false);
                    } catch (e) {
                        FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
                    }
                } else {
                    item[1].checked = false;
                }
            }
        });
  `;
    return template;
};

const alertPopup = (component) => {
    const template = /*javascript*/ `
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
                ${
                    component.action === "set-value" &&
                    component.type !== "radio"
                        ? setValue(component)
                        : ""
                }
                ${
                    component.action === "toggle-signal"
                        ? toggleSignal(component)
                        : ""
                }
                ${component.action === "set-string" ? setString(component) : ""}
                ${component.type === "radio" ? setRadioButton(component) : ""}
            }
            ${component.type === "switch" ? alertElseSwitch(component) : ""}
            ${component.type === "input" ? alertElseInput(component) : ""}
            ${component.type === "radio" ? alertElseRadio(component) : ""}
        }, FPComponents.Popup_A.STYLE.${component.alertType});
    `;
    return template;
};

// Assuming that this part is being used in switch event callbback because a variable
// from switch onChange event listener is being used here
const alertElseSwitch = (component) => {
    const template = /*javascript*/ `
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
    const template = /*javascript*/ `
        else {
          ${component.id}.text = ${component.id}.prevText;
        }
    `;
    return template;
};

const alertElseRadio = (component) => {
    const template = /*javascript*/ `
        else {
            ${component.radioGroup}.${component.id}.checked = false;
        }
    `;
    return template;
};

const inputCallback = (component) => {
    const template = /*javascript*/ `
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
    setRadioButton,
};
