const sendData = () => {
    const components = [];
    window.components?.forEach(component => {
        const objectComponent = {
            type: component.getAttribute('data-type'),
            id: component.componentConfig.id,
            name: component.getAttribute('data-name'),
            // Position
            top: component.style.top,
            left: component.style.left,
            // Data
            signalName: 'diSignal_0',
            rapidVarName: 'bool1',
            // Location
            robotName: 'T_ROB1',
            moduleName: 'main_module',
            // Other Parameters
            text: '+',
            textAdditional: '+',
            increase: true,
            changeValueBy: 20
        }
        components.push(objectComponent);
    });

    if (components.length > 0) {
        window.api.send('toMain', JSON.stringify(components));
    }
};

// Initialization
const init = () => {
    document.querySelector('#build-app').addEventListener('click', () => {
        sendData();
    });
};

export default {init};
