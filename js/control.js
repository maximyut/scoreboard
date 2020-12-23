const electron = require('electron');
const {ipcRenderer} = electron;

document.querySelector('.time-setter').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  const minutes = document.querySelector('#set-minutes').value;
  const seconds = document.querySelector('#set-seconds').value;
  console.log(ipcRenderer);
  console.log(minutes);
  console.log(seconds);
  ipcRenderer.send('set-time', minutes, seconds);
}

const start = document.querySelector('#start'),
      stop = document.querySelector("#stop");

start.addEventListener('click', () => {
  let value = true;
  ipcRenderer.send('start', value);
});

stop.addEventListener('click', () => {
  let value = false;
  ipcRenderer.send('start', value);
});
