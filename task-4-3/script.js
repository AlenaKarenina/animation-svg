let PERCENTAGE = null;

const svg = document.querySelector('svg');
const path = svg.querySelector('path');
const pathLength = path.getTotalLength();
const motionElement = svg.querySelector('.target')

const htmlElement = document.documentElement;
htmlElement.style.height = `${svg.scrollHeight * 3}px`;

const documentHeight = htmlElement.scrollHeight;

const updatePosition = () => {
  const position = path.getPointAtLength(PERCENTAGE * pathLength);

  motionElement.setAttribute('transform', `translate(${position.x}, ${position.y})`);
  requestAnimationFrame(updatePosition);
};

const updatePercentage = () => {
  PERCENTAGE = htmlElement.scrollTop / (documentHeight - htmlElement.clientHeight);
};

window.addEventListener("scroll", updatePercentage);

requestAnimationFrame(updatePosition);
