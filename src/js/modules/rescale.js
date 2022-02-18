const draggable = ".draggable",
  flexpendant = {
    x: 1024,
    y: 768,
  };

// Rescales components according to flexpendant screen ratio
const rescaleComponents = () => {
  const workspaceStyle = getComputedStyle(document.querySelector(".workspace"));
  const coeficient = {
    x: parseInt(workspaceStyle.width) / flexpendant.x,
    y: parseInt(workspaceStyle.height) / flexpendant.y,
  };
  document.querySelectorAll(draggable).forEach((item) => {
    const style = getComputedStyle(item);
    item.style.width = "";
    item.style.width = `${coeficient.x * parseInt(style.width)}px`;
    item.style.height = "";
    item.style.height = `${coeficient.y * parseInt(style.height)}px`;
    item.style.fontSize = "";
    item.style.fontSize = `${coeficient.y * parseInt(style.fontSize)}px`;
  });
};

// Initialization
const init = () => {
  rescaleComponents();
  window.addEventListener("resize", rescaleComponents);
};

export default { init };
