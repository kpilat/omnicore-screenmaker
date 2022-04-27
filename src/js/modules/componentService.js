const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    dropzone = '.workspace';

const componentClone = (item) => {
    const newItem = item.cloneNode(true);
    // newItem["componentConfig"] = [...item.componentConfig];
    // newItem["componentSettings"] = [...item.componentSettings];
    newItem['componentConfig'] = {};
    newItem['componentSettings'] = {};
    for (const [key, value] of Object.entries(item.componentConfig)) {
        newItem.componentConfig[`${key}`] = value;
    }
    for (const [key, value] of Object.entries(item.componentSettings)) {
        newItem.componentSettings[`${key}`] = value;
    }
    newItem.componentConfig.id = idGenerator(5, item.componentConfig.type);
    newItem.componentConfig.workspaceId = document.querySelector('.workspace').getAttribute('id');
    // newItem.style.top = eval(`${parseInt(newItem.style.top)} + 2`) + "%";
    // newItem.style.left = eval(`${parseInt(newItem.style.left)} + 2`) + "%";
    document.querySelector(dropzone).appendChild(newItem);
};

// Creates new element in workspace
const componentInit = (item) => {
    if (item.classList.contains('assigned')) {
        return;
    }
    const newItem = item.cloneNode(true);
    const position = item.getBoundingClientRect();
    const workspace = document.querySelector(dropzone);
    newItem.classList.add('assigned');
    newItem.style.cssText = `
        top: ${
            (100 / workspace.clientHeight) * (position.y - workspace.offsetTop)
        }%;
        left: ${(100 / workspace.clientWidth) * position.x}%;
        width: ${item.style.width};
        height: ${item.style.height};
        font-size: ${item.style.fontSize};
        min-width: auto
    `;
    resetComponent(item);
    resetComponent(newItem);

    newItem['componentConfig'] = {
        id: idGenerator(5, item.getAttribute('data-type')),
        type: item.getAttribute('data-type'),
        text: item.getAttribute('data-text'),
        workspaceId: workspace.getAttribute('id')
    };
    newItem['componentSettings'] = assignSettings(newItem.componentConfig);
    document.querySelector(dropzone).appendChild(newItem);
};

const resetComponent = (item) => {
    item.setAttribute('data-x', 0);
    item.setAttribute('data-y', 0);
    item.style.transform = 'translate(0, 0)';
    item.classList.remove('dragging', 'can-drop');
};

// Pass component type (Button) to prepend the generated id
const idGenerator = (length, type) => {
    let result = type ? `${type}_` : '';
    for (let i = 0; i < length; i++) {
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return result;
};

const assignSettings = (newItem) => {
    const obj = {};
    switch (newItem.type) {
        case 'button':
            obj['componentText'] = true;
            obj['signal'] = true;
            obj['rapid'] = true;
            obj['target'] = true;
            obj['action'] = true;
            obj['alert'] = true;
            break;
        case 'digital':
            obj['componentText'] = true;
            obj['signal'] = true;
            obj['rapid'] = true;
            obj['target'] = true;
            obj['action'] = true;
            obj['alert'] = true;
            break;
        case 'radio':
            obj['componentText'] = true;
            obj['radioGroup'] = true;
            obj['rapid'] = true;
            obj['target'] = true;
            obj['action'] = true;
            obj['alert'] = true;
            break;
        case 'input':
            obj['rapid'] = true;
            obj['target'] = true;
            obj['action'] = true;
            obj['alert'] = true;
            break;
        case 'switch':
            obj['signal'] = true;
            obj['rapid'] = true;
            obj['target'] = true;
            obj['action'] = true;
            obj['alert'] = true;
            break;
        case 'label':
            obj['componentText'] = true;
            obj['rapid'] = true;
            obj['target'] = true;
            obj['callback'] = true;
            break;
    }
    return obj;
};

// Pass node to be set as active || pass nothing to just set a current node as inactive
const changeActiveState = (target) => {
    if (window.activeComponent) {
        window.activeComponent.classList.remove('active-component');
    }
    if (target) {
        target.classList.add('active-component');
        window.activeComponent = target;
    } else {
        window.activeComponent = undefined;
    }
};

export default {
    componentInit,
    componentClone,
    resetComponent,
    changeActiveState,
    idGenerator
};
