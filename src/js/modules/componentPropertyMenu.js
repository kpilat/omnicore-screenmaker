const windowInit = () => {
  const tabs = document.querySelector('.c-property-menu .tabs').children;
  [...tabs].forEach(tab => tab.addEventListener('click', tabSwitch));
};

const tabSwitch = (event) => {
  const target = event.target;
  let previous;
  [...target.parentNode.children].forEach(item => {
    if (item.classList.contains('is-selected')) {
      previous = item;
      return;
    }
  });
  const previousContent = previous.getAttribute('name');
  const targetContent = target.getAttribute('name');
  previous.classList.remove('is-selected');
  target.classList.add('is-selected');
  document.querySelector(`.c-property-menu > [name="${previousContent}"]`).style.display = 'none';
  document.querySelector(`.c-property-menu > [name="${targetContent}"]`).style.display = 'flex';
}

const toggleVisibility = () => {
  const propWindow = document.querySelector(".c-property-menu");
  const display = propWindow.getComputedStyle().display;
  if (display.equals('flex')) {
    propWindow.style.display = "none";
  } else {
    propWindow.style.display = "flex";
  }
}

export default { windowInit, toggleVisibility };
