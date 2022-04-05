import interact from "interactjs";

const draggable = ".draggable",
    dropzone = ".workspace",
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// Draggable components setup
const draggableInit = () => {
    interact(draggable).draggable({
        onmove: function (event) {
            const target = event.target;

            const dataX = target.getAttribute("data-x");
            const dataY = target.getAttribute("data-y");
            const initialX = parseFloat(dataX) || 0;
            const initialY = parseFloat(dataY) || 0;

            const deltaX = event.dx;
            const deltaY = event.dy;

            const newX = initialX + deltaX;
            const newY = initialY + deltaY;

            target.style.transform = `translate(${newX}px, ${newY}px)`;

            target.setAttribute("data-x", newX);
            target.setAttribute("data-y", newY);
        },
    });
};

// Dropzone setup
const dropzoneInit = () => {
    interact(dropzone).dropzone({
        accept: draggable,
        overlap: 1,
        ondropactivate: function (event) {
            const item = event.relatedTarget;
            item.classList.add("dragging");
        },
        ondropdeactivate: function (event) {
            const item = event.relatedTarget;
            if (!item.classList.contains("can-drop")) {
                resetComponent(item);
            } else {
                cloneDraggable(item);
            }
        },
        ondragenter: function (event) {
            const item = event.relatedTarget;
            item.classList.add("can-drop");
        },
        ondragleave: function (event) {
            const item = event.relatedTarget;
            item.classList.remove("can-drop");
        },
    });
};

// Creates new element in workspace
const cloneDraggable = (item) => {
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
        font-size: ${item.style.fontSize}
    `;
    resetComponent(item);
    resetComponent(newItem);

    newItem['componentConfig'] = {
        'id': idGenerator(10),
        'type': item.getAttribute('data-type'),
        'name': item.getAttribute('data-name'),
    }
    newItem['componentSettings'] = assingSettings(newItem.componentConfig);
    document.querySelector(dropzone).appendChild(newItem);
};

const resetComponent = (item) => {
    item.setAttribute("data-x", 0);
    item.setAttribute("data-y", 0);
    item.style.transform = "translate(0, 0)";
    item.classList.remove("dragging", "can-drop");
};

const idGenerator = (length) => {
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return result;
}

const assingSettings = (newItem) => {
    const obj = {}
    switch (newItem.type) {
        case 'button':
        case 'digital':
            obj['componentText'] = true;
            break;
            
    }
    return obj;
}

// Initialization
const init = () => {
    draggableInit();
    dropzoneInit();
};

export default {init};
