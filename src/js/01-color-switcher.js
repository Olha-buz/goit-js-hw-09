function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const body = document.body;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop');
let timerId = null;


startBtn.addEventListener("click", clickStartBtn);
stopBtn.addEventListener("click", clickStopBtn);

function clickStartBtn(evt) {
    evt.target.disabled = true;
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function clickStopBtn(evt) {
    startBtn.disabled = false;
    clearInterval(timerId);
};