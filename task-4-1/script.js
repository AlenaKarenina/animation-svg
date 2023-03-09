const cursor = document.querySelector('.cursor');
const cursorPointer = cursor.querySelector('.pointer');
const lines = cursor.querySelectorAll('.line');
let activeColor;

const PARAMS = {
  speed: 0.2,
  offset: Math.round(cursor.getBoundingClientRect().width / 2)
}

const COLORS = [
  '#F66C41',
  '#00E0FF',
  '#D9AB36',
  '#4EF483',
  '#7C4EFF'
];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

const mouse = {
  x: null,
  y: null
}

const pos = {
  x: null,
  y: null
};

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x = Math.round(pos.x + diffX * PARAMS.speed);
  pos.y = Math.round(pos.y + diffY * PARAMS.speed);

  const translate = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
  cursor.style.transform = translate;
};

const updateCoordinates = e => {
  mouse.x = e.clientX - PARAMS.offset;
  mouse.y = e.clientY - PARAMS.offset;
}

const clickHandler = () => {
  const color = getRandomElement(COLORS);
  const currentColor = window.getComputedStyle(cursorPointer).fill;

  if (color === activeColor) {
    clickHandler()
  } else {
    cursorPointer.style.fill = color;
    activeColor = color;
  }

  lines.forEach(line => {
    line.style.stroke = currentColor;
  })

  anime({
    targets: lines,
    strokeDashoffset: [0, anime.setDashoffset],
    opacity: [1, 0],
    duration: 235,
    easing: 'easeInOutQuad'
  })
}

window.addEventListener('mousemove', updateCoordinates);
window.addEventListener('click', clickHandler);

const requestAnimationHandler = () => {
  updateCursor();
  requestAnimationFrame(requestAnimationHandler);
}

requestAnimationFrame(requestAnimationHandler);
