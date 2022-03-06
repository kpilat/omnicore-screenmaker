const subscribeVariable = (component) => {
    const template = `
        try {
            ${component.id + component.id} = await RWS.Rapid.getData("${component.robotName}", "${component.moduleName}", "${component.rapidVarName}");
            await ${component.id + component.id}.subscribe(true);
        } catch(e) {
            FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find Rapid variable with name ${component.rapidVarName}\`]);
        }
    `;
    return template;
};

const subscribeSignal = (component) => {
    const template = `
        try {
            ${component.id + component.id} = await RWS.IO.getSignal('${component.signalName}');
            await ${component.id + component.id}.subscribe(true);
        } catch(e) {
            FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find I/O with name ${component.signalName}\`]);
        }
    `;
    return template;
};

export default { subscribeVariable, subscribeSignal }