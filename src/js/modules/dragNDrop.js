import interact from "interactjs";
import ComponentService from "./componentService";

const draggable = ".draggable",
    dropzone = ".workspace";
let interactable;

// Draggable components setup
const draggableInit = () => {
    interactable = interact(draggable).draggable({
        modifiers: [
            interact.modifiers.snap({
                targets: [snapGridInit()],
                relativePoints: [
                    { x: 0, y: 0 }, // snap relative to the element's top-left,
                    // { x: 1, y: 0 }, // snap relative to the element's top-right,
                    { x: 0, y: 1 }, // to the bottom-left
                    // { x: 1, y: 1 }, // to the bottom-right
                ],
                mode: "grid",
            })
        ],
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
        onend: function (event) {
            const target = event.target;
            if (target.classList.contains("assigned")) {
                const position = target.getBoundingClientRect();
                const workspace = document.querySelector(dropzone);

                target.style.top = `${
                    (100 / workspace.clientHeight) *
                    (position.y - workspace.offsetTop)
                }%`;
                target.style.left = `${
                    (100 / workspace.clientWidth) * position.x
                }%`;

                target.style.transform = "translate(0,0)";
                target.setAttribute("data-x", "0");
                target.setAttribute("data-y", "0");
            }
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

// Initializes dropzone grid. Defines draggable snapping effect
const snapGridInit = () => {
    const workspace = document.querySelector(dropzone);
    const clientRect = workspace.getBoundingClientRect();

    const snapGrid = interact.snappers.grid({
        // can be a pair of x and y, left and top,
        // right and bottom, or width, and height
        x: 40,
        y: 40,

        // optional
        // range: 10,
        relativePoints: [{ x: 0, y: 0 }],

        // optional
        offset: { x: 0, y: 0 },

        // optional
        limits: {
            top: clientRect.top + 1,
            left: clientRect.left + 1,
            bottom: clientRect.top + clientRect.height - 1,
            right: clientRect.left + clientRect.width - 1,
        },
    });

    return snapGrid;
};

// Updates dropzone grid (proportions). It's meant to be called on every window resize
const dropzoneRedefine = () => {
    interactable.options.drag.modifiers[0].options.targets = [snapGridInit()];
};

// Initialization
const init = () => {
    draggableInit();
    dropzoneInit();

    window.addEventListener("resize", () => {
        dropzoneRedefine();
    });
};

export default { init };
