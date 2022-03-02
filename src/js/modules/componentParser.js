const sendData = () => {
    const components = [];
    window.components?.forEach(component => {
        const objectComponent = {
            type: component.getAttribute('data-type'),
            id: component.componentConfig.id,
            name: component.getAttribute('data-name'),
            signalName: 'signalName'
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
