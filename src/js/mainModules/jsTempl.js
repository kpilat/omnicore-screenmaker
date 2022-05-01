// Initializes the given component according its type
import Components from './componentTempl';

const componentInit = (component) => {
    switch (component.type) {
        case 'button':
            return Components.buttonInit(component);
        case 'digital':
            return Components.digitalInit(component);
        case 'switch':
            return Components.switchInit(component);
        case 'input':
            return Components.inputInit(component);
        case 'radio':
            return Components.radioInit(component);
        case 'label':
            return Components.labelInit(component);
        default:
            return '';
    }
};

// Inserting parts of code to actual template
const injectTemplate = (components, tabs) => {
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
            
            ${components.tabs ? components.tabs : ''}
        });
    
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
        componentCode: '',
        componentVariables: '',
        componentGroups: '',
        componentSubscribe: '',
        componentUnsubscribe: '',
        tabs: '',
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
    components.tabs = input.tabs

    return components;
};

const tabsInit = (tabs) => {
    if (tabs.length < 2) return null;
    let template = 'var tabContainer = new FPComponents.Tabcontainer_A();';

    tabs.forEach(tab => {
        template += `tabContainer.addTab("${tab.name}", "${tab.id}");`;
    });

    template += 'tabContainer.attachToId("tab-container");'

    return template;
}

export default {
    componentInit,
    injectTemplate,
    subscribe,
    unsubscribe,
    stringJoin,
    tabsInit
};
