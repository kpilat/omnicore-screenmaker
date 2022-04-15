import interact from "interactjs";
import ComponentService from "./componentService";

const draggable = ".draggable",
    dropzone = ".workspace";

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
                ComponentService.resetComponent(item);
            } else {
                ComponentService.componentInit(item);
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

// Initialization
const init = () => {
    draggableInit();
    dropzoneInit();
};

export default { init };
