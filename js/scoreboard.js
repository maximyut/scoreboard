const { ipcMain } = require('electron');
const electron = require('electron');
const {ipcRenderer} = electron;

const minutesValue = document.querySelector('#minutes');
const secondsValue = document.querySelector('#seconds');

let total,
    m,
    s,
    minutes,
    seconds;

function getZero(num) {
  if (num >= 0 && num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}

ipcRenderer.on('set-time', function(e, minutes, seconds){
  console.log(seconds);
  m = minutes;
  s = seconds;
  minutesValue.textContent = m;
  secondsValue.textContent = s;
  console.log(getZero(minutes));
  console.log(getZero(seconds));
  total = Math.floor(Number(minutes) * 60 + Number(seconds));
  if (total < 15) {
    secondsValue.classList.add('red');
  } else {
    secondsValue.classList.remove('red');
  }
  return m, s;
});

let ok;

function update() {
  function newNumber () {

    total = total - 1;
    minutes = Math.floor(total / 60);
    seconds = Math.floor(total - (minutes * 60));

    minutesValue.textContent = getZero(minutes);
    secondsValue.textContent = getZero(seconds);
    
    if (total < 15) {
      secondsValue.classList.add('red');
    }

    if (total <= 0) {
      clearInterval(timeInterval);
      ok = setInterval(change, 600);
    }

    function change() {
      secondsValue.classList.toggle('hide');
    }

  }
  
  let timeInterval = setInterval(newNumber, 1000);

  ipcRenderer.on('start-stop', function(e, value){
    if (value == false) {
      clearInterval(timeInterval);
      console.log('stop');
    } 
  }); 

  ipcRenderer.on('reset', function(e, resetValue){
    if (resetValue) {
      clearInterval(timeInterval);
      clearInterval(ok);
      secondsValue.classList.remove('hide');
      minutesValue.textContent = m;
      secondsValue.textContent = s;
      total = Math.floor(Number(m) * 60 + Number(s));
      if (total < 15) {
        secondsValue.classList.add('red');
      } else {
        secondsValue.classList.remove('red');
      }
    }
  });
}


ipcRenderer.on('start-stop', function(e, value){
  if (value) {
    update();
    console.log('start');
  }
});

ipcRenderer.on('change-time', function(e, add) {
  total = total + add;
  minutes = Math.floor(total / 60);
  seconds = Math.floor(total - (minutes * 60));
  minutesValue.textContent = getZero(minutes);
  secondsValue.textContent = getZero(seconds);
});




//score
const aka = document.querySelector(".aka"),
      pointsAka = aka.querySelector(".points");

ipcRenderer.on('score', function(e, value) {
  console.log(value);
  pointsAka.textContent = Math.floor(Number(pointsAka.textContent) + value);
});


//warnings
const cAka = aka.querySelector('#C'),
      kAka = aka.querySelector('#K'),
      hcAka = aka.querySelector('#HC'),
      hAka = aka.querySelector('#H');

ipcRenderer.on('warnings', function(e, value){
  console.log(value);
  if (value) {
    cAka.style.backgroundColor = "black";
  } else {
    cAka.style.backgroundColor = "";
  }
});

ipcRenderer.on('warnings', function(e, value){
  console.log(value);
  if (value) {
    kAka.style.backgroundColor = "black";
  } else {
    kAka.style.backgroundColor = "";
  }
});