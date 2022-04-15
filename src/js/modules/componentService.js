const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    dropzone = ".workspace";


const componentClone = (item) => {
    const newItem = item.cloneNode(true);
    newItem["componentConfig"] = item.componentConfig;
    newItem["componentSettings"] = item.componentSettings;
    newItem.componentConfig.id = idGenerator(10);
    newItem.style.top = eval(`${parseInt(newItem.style.top)} + 2`) + '%';
    newItem.style.left = eval(`${parseInt(newItem.style.left)} + 2`) + '%';
    document.querySelector(dropzone).appendChild(newItem);
};

// Creates new element in workspace
const componentInit = (item) => {
    if (item.classList.contains("assigned")) {
        return;
    }
    const newItem = item.cloneNode(true);
    const position = item.getBoundingClientRect();
    const workspace = document.querySelector(dropzone);
    newItem.classList.add("assigned");
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

    newItem["componentConfig"] = {
        id: idGenerator(10),
        type: item.getAttribute("data-type"),
        text: item.getAttribute("data-text"),
    };
    newItem["componentSettings"] = assignSettings(newItem.componentConfig);
    document.querySelector(dropzone).appendChild(newItem);
};

const resetComponent = (item) => {
    item.setAttribute("data-x", 0);
    item.setAttribute("data-y", 0);
    item.style.transform = "translate(0, 0)";
    item.classList.remove("dragging", "can-drop");
};

const idGenerator = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return result;
};

const assignSettings = (newItem) => {
    const obj = {};
    switch (newItem.type) {
        case "button":
        case "digital":
            obj["componentText"] = true;
            break;
    }
    return obj;
};

export default { componentInit, componentClone, resetComponent };
