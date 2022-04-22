const draggable = ".draggable",
    flexpendant = {
        x: 1024,
        y: 680,
    },
    options = {
        
    };

// Rescales components according to flexpendant screen ratio
const rescaleComponents = () => {
    const workspaceStyle = getComputedStyle(
        document.querySelector(".workspace")
    );
    const coeficient = {
        x: parseFloat(workspaceStyle.width) / flexpendant.x,
        y: parseFloat(workspaceStyle.height) / flexpendant.y,
    };
    document.querySelectorAll(draggable).forEach((item) => {
        rescale(item, coeficient);
    });
};

const rescale = (item, coeficient) => {
    item.style.width = "";
    item.style.height = "";
    item.style.fontSize = "";
    const style = getComputedStyle(item);
    item.style.width = `${coeficient.x * parseFloat(style.width)}px`;
    item.style.height = `${coeficient.y * parseFloat(style.height)}px`;
    item.style.fontSize = `${coeficient.y * parseFloat(style.fontSize)}px`;
};

// Initialization
const init = () => {
    rescaleComponents();
    window.addEventListener("resize", rescaleComponents);
};

export default { init, rescaleComponents };
