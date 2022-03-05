// Digital component code creation with desired values
const digitalInit = (component) => {
    const newComponent = `
    ${component.id} = new FPComponents.Digital_A();
    ${component.id}.desc = "${component.name}";
    ${component.id}.attachToId("${component.id}");
    ${component.id}.onclick = async function () {
        var setValue = ${component.id}.active ? 0 : 1;
        ${component.id}.active = !${component.id}.active
        try {
            await ${component.id + component.id}.setValue(setValue);
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
        }
    };
    try {
        ${component.id + component.id} = await RWS.IO.getSignal('${component.signalName}');
        ${component.id + component.id}.addCallbackOnChanged(async (newValue) => {
            // first time this is called, newValue is undefined.
            if (newValue == undefined) {
                newValue = await ${component.id + component.id}.getValue();
            }

            // since 1 and 0 work for true or false we can use the new value directly to set UI status.
            ${component.id}.active = newValue;
        })
        await ${component.id + component.id}.subscribe(true);
    } catch (e) {
        FPComponents.Popup_A.message(e.message, [e.message, \`Couldn't find I/O with name ${component.signalName}\`]);
    }
    `;
    return newComponent;
};

export default { digitalInit }