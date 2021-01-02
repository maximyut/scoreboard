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
const akaC1 = aka.querySelector('.firstCategory'),
      akaC2 = aka.querySelector('.secondCategory'),
      akaC1C= akaC1.querySelector('#C1'),
      akaC1K = akaC1.querySelector('#K1'),
      akaC1HC = akaC1.querySelector('#HC1'),
      akaC1H = akaC1.querySelector('#H1'),
      akaC2C= akaC2.querySelector('#C2'),
      akaC2K = akaC2.querySelector('#K2'),
      akaC2HC = akaC2.querySelector('#HC2'),
      akaC2H = akaC2.querySelector('#H2');

ipcRenderer.on('warnings', function(e, value){
  console.log(value);
  switch (value) {
    case 'C1': 
      akaC1C.style.backgroundColor = "black";
      break;
    case 'C1rem': 
      akaC1C.style.backgroundColor = "";
      break;
    case 'K1': 
      akaC1K.style.backgroundColor = "black";
      break;
    case 'K1rem': 
      akaC1K.style.backgroundColor = "";
      break;
    case 'HC1': 
      akaC1HC.style.backgroundColor = "black";
      break;
    case 'HC1rem': 
      akaC1HC.style.backgroundColor = "";
      break;
    case 'H1': 
      akaC1H.style.backgroundColor = "black";
      break;
    case 'H1rem': 
      akaC1H.style.backgroundColor = "";
      break;
    case 'C2': 
      akaC2C.style.backgroundColor = "black";
      break;
    case 'C2rem': 
      akaC2C.style.backgroundColor = "";
      break;
    case 'K2': 
      akaC2K.style.backgroundColor = "black";
      break;
    case 'K2rem': 
      akaC2K.style.backgroundColor = "";
      break;
    case 'HC2': 
      akaC2HC.style.backgroundColor = "black";
      break;
    case 'HC2rem': 
      akaC2HC.style.backgroundColor = "";
      break;
    case 'H2': 
      akaC2H.style.backgroundColor = "black";
      break;
    case 'H2rem': 
      akaC2H.style.backgroundColor = "";
      break;
  }
  
});
