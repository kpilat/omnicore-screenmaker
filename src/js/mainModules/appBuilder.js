const fs = require('fs');
const path = require('path');

const build = (data) => {
    data = JSON.parse(data);
    const components = {
        'componentCode': [],
        'componentVariables': [],
        'componentSubscribe': [],
        'componentUnsubscribe': []
    }

    data.forEach(component => {
        components.componentCode.push(componentsInit(component));
        components.componentVariables.push('var ' + component.id + ';');
        components.componentVariables.push('var ' + component.id + component.id + ';');
        components.componentSubscribe.push(subscribe(component));
        components.componentUnsubscribe.push(unsubscribe(component));
    });

    const toTemplate = stringJoin(components);
    let test = insertToTemplate(toTemplate);
    console.log(test);
    fsWrite(test);
};

const componentsInit = (component) => {
    switch (component.type) {
        case "button":
            //return digitalInit(component);
            break;
        case "digital":
            return digitalInit(component);
        default:
            return undefined;
    }
};

const stringJoin = (input) => {
    const components = {
        'componentCode': '',
        'componentVariables': '',
        'componentSubscribe': '',
        'componentUnsubscribe': ''
    }

    input.componentCode.forEach((item) => {
        components.componentCode += item;
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
    return components;
};

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

const jsVariables = (component) => {
    return component.id;
};

const fsWrite = (componentJs) => {
    const basePath = './WebApps/Test/';
    const fileName = 'app.js';
    ensureDirectoryExistence(basePath);
    fs.writeFile(basePath + fileName, componentJs, function (err) {
        if (err) return console.log(err);
        console.log('Done!');
    });
};

const insertToTemplate = (components) => {
    const code = `
        ${components.componentVariables}
        window.addEventListener("load", async function () {
        try {
                ${components.componentCode}
            } catch (e) {
        var err = JSON.stringify(e);
        console.log(err);
        console.log(e);
        FPComponents.Popup_A.message("Something went wrong!", "Application might not work as intended");
    }
    
    this.initView();
    
    var initView = function () {
    var mainView = document.getElementById("io-view");
    mainView.style.display = "flex";
    mainView.style.position = "relative";
    }
    var appActivate = async function () {
        ${components.componentSubscribe}
        return true;
    }
    
    var appDeactivate = async function () {
        ${components.componentUnsubscribe}
        return true;
    }
    });
    `;

    return code;
};

const subscribe = (component) => {
    return `
    if (${component.id + component.id}) {
        await ${component.id + component.id}.subscribe(true);
    }
    `;
};

const unsubscribe = (component) => {
    return `
    if (${component.id + component.id}) {
        await ${component.id + component.id}.unsubscribe();
    }
    `;
};

const ensureDirectoryExistence = (basePath) => {
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, {recursive: true});
    }
}

export default {build};
