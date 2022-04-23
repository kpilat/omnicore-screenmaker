import Utilities from "../utilities";
import ComponentParser from "../componentParser";

const openProject = () => {
    window.api.receive("load_fromMain", (data) => {
        const parsed = JSON.parse(data);
        const elements = [];

        const workspace = document.querySelector(".workspace");
        while (workspace.firstChild) {
            workspace.removeChild(workspace.firstChild);
        }

        parsed?.forEach((item) => elements.push(Utilities.toDOM(item)));
        elements?.forEach((item) => workspace.appendChild(item));
    });
};

const saveProject = () => {
    window.api.receive("save_fromMain", () => {
        const components = [];
        window.components?.forEach((item) =>
            components.push(Utilities.toJSON(item))
        );

        window.api.send("save_fromRenderer", JSON.stringify(components));
    });
};

const buildProject = () => {
    window.api.receive("build_fromMain", () => {
        window.api.send(
            "build_fromRenderer",
            JSON.stringify(ComponentParser.sendData())
        );
    });
};

const init = () => {
    saveProject();
    buildProject();
    openProject();
};

export default { init };
