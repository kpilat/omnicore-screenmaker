import Utilities from './utilities';
import Rescale from './rescale';
import ComponentService from './componentService';

const workspaceSelector = '.workspace',
    menuSelector = '.c-context-menu',
    components = [],
    observerConfig = {
        childList: true,
    };
let updateComponentList;

// Workspace changes observer
const watchDog = (definedFunction) => {
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
                ComponentService.changeActiveState(node);

                node.addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    ComponentService.changeActiveState(event.target);
                    contextMenuVisibility(event);
                });
                node.addEventListener('click', (event) => {
                    ComponentService.changeActiveState(event.target);
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
        Rescale.rescaleComponents();
        updateComponentList();
    });
};

// Modifying components according data-action attributes
const contextMenuActions = (event) => {
    const action = event.target.getAttribute('data-action');
    switch (action) {
        case 'delete':
            window.activeComponent.remove();
            break;
        default:
        // code block
    }
};

const contextMenuVisibility = (event) => {
    const menu = document.querySelector(menuSelector);
    if (event.button === 2) {
        menu.classList.remove('hide');
    } else {
        menu.classList.add('hide');
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
        item.addEventListener('click', (event) => {
            contextMenuActions(event);
        });
    });
};

// Initialization
const init = (definedFunction) => {
    updateComponentList = definedFunction;
    watchDog();
    contextMenuInit();
    document.addEventListener('click', contextMenuVisibility);
};

export default { init };
