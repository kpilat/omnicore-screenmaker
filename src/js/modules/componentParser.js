const sendData = () => {
    const components = [];
    window.components?.forEach((component) => {
        //const path = component.componentConfig.path.split("/");
        const objectComponent = {
            type: component.componentConfig.type,
            id: component.componentConfig.id,
            // name: component.componentConfig.name,
            // Positionß
            top: component.style.top,
            left: component.style.left,
            // Data
            targetType: component.componentConfig.target,
            targetName: component.componentConfig.targetName,
            // Location
            robotName: component.componentConfig.robotName,
            moduleName: component.componentConfig.moduleName,
            // Other Parameters
            text: component.componentConfig.text,
            action: component.componentConfig.action,
            callback: component.componentConfig.callback,
            alertType: component.componentConfig.alertType,
            alertMessage: component.componentConfig.alertMessage,
            alertTitle: component.componentConfig.alertTitle,
            step: component.componentConfig.step,
            group: "goup1",
        };
        Object.keys(objectComponent).forEach((key) => {
            if (
                objectComponent[key] === "" ||
                objectComponent[key] === undefined
            ) {
                delete objectComponent[key];
            }
        });
        components.push(objectComponent);
    });

    if (components.length > 0) {
        return components;
    }
};

export default { sendData };
