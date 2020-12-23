const { ipcMain } = require('electron');
const electron = require('electron');
const {ipcRenderer} = electron;

const minutesValue = document.querySelector('#minutes');
const secondsValue = document.querySelector('#seconds');
let total;

ipcRenderer.on('set-time', function(e, minutes, seconds){

  console.log(minutes);
  console.log(seconds);
  minutesValue.textContent = minutes;
  secondsValue.textContent = seconds;
  total = Math.floor(Number(minutes) * 60 + Number(seconds));
});


let minutes,
    seconds;
function update() {
  function newNumber () {

    total = total - 1;
    minutes = Math.floor(total / 60);
    seconds = Math.floor(total - (minutes * 60));

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return '0' + num;
      } else {
        return num;
      }
    }

    minutesValue.textContent = getZero(minutes);
    secondsValue.textContent = getZero(seconds);
    
    if (total <= 0) {
      clearInterval(timeInterval);
    }
  }
  
  let timeInterval = setInterval(newNumber, 1000);
  ipcRenderer.on('start', function(e, value){
    if (value == false) {
      clearInterval(timeInterval)
    } 
  });
}




ipcRenderer.on('start', function(e, value){
  if (value) {
    update();
  }
});