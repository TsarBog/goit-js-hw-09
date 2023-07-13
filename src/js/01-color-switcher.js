function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


const selectors = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};


selectors.startButton.addEventListener('click', onBackgroundChange);
selectors.stopButton.addEventListener('click', onStopButtonClick);

let idInterval = null;


function onBackgroundChange() {
  selectors.startButton.disabled = true;
  selectors.stopButton.disabled = false;
  idInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopButtonClick() {
  selectors.startButton.disabled = false;
  selectors.stopButton.disabled = true;
  clearInterval(idInterval);
}
