const subscribeVariable = (component) => {
    const template = `
        try {
            ${component.id + component.id} = await RWS.Rapid.getData("${component.robotName}", "${component.moduleName}", "${component.targetName}");
            await ${component.id + component.id}.subscribe(true);
        } catch(e) {
            FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find Rapid variable with name ${component.targetName}\`]);
        }
    `;
    return template;
};

const subscribeSignal = (component) => {
    const template = `
        try {
            ${component.id + component.id} = await RWS.IO.getSignal('${component.targetName}');
            await ${component.id + component.id}.subscribe(true);
        } catch(e) {
            FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find I/O with name ${component.targetName}\`]);
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
}

const decreaseValue = (component) => {
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
}

const toggleSignal = (component) => {
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
}

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
}

const alertMessage = (component) => {
    const template = `
        FPComponents.Popup_A.confirm('${component.alertTitle}', '${component.alertMessage}', async function (action) {
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
                    component.action === "set-value"
                        ? setValue(component)
                        : ""
                }
                ${
                    component.action === "toggle-signal"
                        ? toggleSignal(component)
                        : ""
                }
            }
        });
    `;
    return template;
}

export default { subscribeVariable, subscribeSignal, increaseValue, decreaseValue, toggleSignal, setValue, alertMessage }