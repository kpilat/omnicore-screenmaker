import Utilities from "./utilities";
const workspaceSelector = ".workspace",
    menuSelector = ".c-context-menu",
    components = [],
    observerConfig = {
        childList: true,
    };

// Workspace changes observer
const watchDog = () => {
    const workspace = document.querySelector(workspaceSelector);
    const observer = new MutationObserver(contentChanged);
    observer.observe(workspace, observerConfig);
};

// Adding and deleting components in workspace
const contentChanged = (mutationsList, observer) => {
    mutationsList.forEach((item) => {
        if (item.addedNodes) {
            item.addedNodes.forEach((node) => {
                components.push(node);

                node.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    window.activeComponent = event.target;
                    contextMenuVisibility(event);
                });
                node.addEventListener("click", (event) => {
                    window.activeComponent = event.target;
                });
            });
        }
        if (item.removedNodes) {
            item.removedNodes.forEach((node) => {
                components.splice(components.indexOf(node), 1);
            });
        }
        // Saves components contained in workspace (for app build)
        window.components = components;
    });
};

// Modifying components according data-action attributes
const contextMenuActions = (event) => {
    const action = event.target.getAttribute("data-action");

    switch (action) {
        case "delete":
            window.activeComponent.remove();
            break;
        default:
        // code block
    }
};

const contextMenuVisibility = (event) => {
    const menu = document.querySelector(menuSelector);
    if (event.button === 2) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
        // window.activeComponent = undefined;
    }
    menu.style.cssText = `
        top: ${event.pageY}px;
        left: ${event.pageX}px
    `;
};

// Context menu initialization
const contextMenuInit = (event) => {
    const menu = document.querySelector(menuSelector);
    const menuItems = Array.from(menu.children);

    menuItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            contextMenuActions(event);
        });
    });
};

const openProject = () => {
    window.api.receive("fromMain", (data) => {
        const parsed = JSON.parse(data);
        const elements = [];

        const workspace = document.querySelector(workspaceSelector);
        while (workspace.firstChild) {
            workspace.removeChild(workspace.firstChild);
        }

        parsed?.forEach((item) => elements.push(Utilities.toDOM(item)));
        elements?.forEach((item) => workspace.appendChild(item));
    });
}

// Initialization
const init = () => {
    watchDog();
    contextMenuInit();
    document.addEventListener("click", contextMenuVisibility);
};

export default { init, openProject };
