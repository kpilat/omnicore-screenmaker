const toJSON = (element) => {
    const obj = {
        innerHTML: element.innerHTML,
        attributes: getAttributes(element),
        componentConfig: element.componentConfig,
        componentSettings: element.componentSettings,
    };
    return obj;
};

const toDOM = (object) => {
    const element = document.createElement('div');
    element.innerHTML = object.innerHTML;
    element['componentConfig'] = object.componentConfig;
    element['componentSettings'] = object.componentSettings;
    object.attributes?.forEach((attr) => element.setAttribute(attr.name, attr.nodeValue));
    return element;
};

const getAttributes = (element) => {
    const nodeAttributes = [...element.attributes];
    const attributes = [];
    nodeAttributes?.forEach((item) => attributes.push({ name: item.name, nodeValue: item.nodeValue }));
    return attributes;
};

const arrToObj = () => {

}

export default { toJSON, toDOM, arrToObj };
