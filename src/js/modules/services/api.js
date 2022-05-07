import Utilities from '../utilities';
import ComponentParser from '../componentParser';

const openProject = (definedFunction) => {
    window.api.receive('load_fromMain', (data) => {
        const parsed = JSON.parse(data);
        const elements = [];

        const workspace = document.querySelector('.workspace');
        while (workspace.firstChild) {
            workspace.removeChild(workspace.firstChild);
        }

        window.appSettings = {
            appName: parsed.appSettings.appName,
        };
        parsed.components?.forEach((item) => elements.push(Utilities.toDOM(item)));
        definedFunction(parsed.tabs);
        elements?.forEach((item) => workspace.appendChild(item));
    });
};

const saveProject = (definedFunction) => {
    window.api.receive('save_fromMain', () => {
        const data = {
            components: [],
            tabs: [],
            appSettings: window.appSettings,
        };
        window.components?.forEach((item) => data.components.push(Utilities.toJSON(item)));
        definedFunction()?.forEach((item) => data.tabs.push(item));

        window.api.send('save_fromRenderer', JSON.stringify(data));
    });
};

const buildProject = (definedFunction) => {
    window.api.receive('build_fromMain', () => {
        const data = {
            components: ComponentParser.sendData(),
            tabs: [],
            appSettings: window.appSettings,
        };
        definedFunction()?.forEach((item) => data.tabs.push(item));

        window.api.send('build_fromRenderer', JSON.stringify(data));
    });
};

export default { buildProject, saveProject, openProject };
