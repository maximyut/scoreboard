const { ipcMain } = require('electron');
const electron = require('electron');
const {ipcRenderer} = electron;

const minutesValue = document.querySelector('#minutes');
const secondsValue = document.querySelector('#seconds');



let total,
    m,
    s;

ipcRenderer.on('set-time', function(e, minutes, seconds){
  m = minutes;
  s = seconds;
  minutesValue.textContent = m;
  secondsValue.textContent = s;
  total = Math.floor(Number(minutes) * 60 + Number(seconds));
  if (total < 15) {
    secondsValue.classList.add('red');
    minutesValue.classList.add('red');
  } else {
    secondsValue.classList.remove('red');
  }
  return m, s;
});

//score
const aka = document.querySelector(".aka"),
      ao = document.querySelector(".ao"),
      pointsAka = aka.querySelector(".points"),
      pointsAo = ao.querySelector(".points");

      pointsAka.classList.remove('blink2');
      pointsAo.classList.remove('blink2');

ipcRenderer.on('score', function(e, akaScore, aoScore) {
  pointsAka.textContent = akaScore;
  pointsAo.textContent = aoScore;

});

ipcRenderer.on('win', function(e,value) {
  if(value=='winAka'){
    pointsAka.classList.add('blink2');
  } else {
    pointsAo.classList.add('blink2');
  }
 

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
      akaC2H = akaC2.querySelector('#H2'),
      aoC1 = ao.querySelector('.firstCategory'),
      aoC2 = ao.querySelector('.secondCategory'),
      aoC1C= aoC1.querySelector('#C1'),
      aoC1K = aoC1.querySelector('#K1'),
      aoC1HC = aoC1.querySelector('#HC1'),
      aoC1H = aoC1.querySelector('#H1'),
      aoC2C= aoC2.querySelector('#C2'),
      aoC2K = aoC2.querySelector('#K2'),
      aoC2HC = aoC2.querySelector('#HC2'),
      aoC2H = aoC2.querySelector('#H2'),
      warning = document.querySelectorAll('.warning');


ipcRenderer.on('warnings', function(e, value){
  console.log(value);
  switch (value) {
    case 'C1aka': 
      akaC1C.style.backgroundColor = "black";
      break;
    case 'C1akarem': 
      akaC1C.style.backgroundColor = "";
      break;
    case 'K1aka': 
      akaC1K.style.backgroundColor = "black";
      break;
    case 'K1akarem': 
      akaC1K.style.backgroundColor = "";
      break;
    case 'HC1aka': 
      akaC1HC.style.backgroundColor = "black";
      break;
    case 'HC1akarem': 
      akaC1HC.style.backgroundColor = "";
      break;
    case 'H1aka': 
      akaC1H.style.backgroundColor = "black";
      break;
    case 'H1akarem': 
      akaC1H.style.backgroundColor = "";
      break;
    case 'C2aka': 
      akaC2C.style.backgroundColor = "black";
      break;
    case 'C2akarem': 
      akaC2C.style.backgroundColor = "";
      break;
    case 'K2aka': 
      akaC2K.style.backgroundColor = "black";
      break;
    case 'K2akarem': 
      akaC2K.style.backgroundColor = "";
      break;
    case 'HC2aka': 
      akaC2HC.style.backgroundColor = "black";
      break;
    case 'HC2akarem': 
      akaC2HC.style.backgroundColor = "";
      break;
    case 'H2aka': 
      akaC2H.style.backgroundColor = "black";
      break;
    case 'H2akarem': 
      akaC2H.style.backgroundColor = "";
      break;
    //ao
    case 'C1ao': 
      aoC1C.style.backgroundColor = "black";
      break;
    case 'C1aorem': 
      aoC1C.style.backgroundColor = "";
      break;
    case 'K1ao': 
      aoC1K.style.backgroundColor = "black";
      break;
    case 'K1aorem': 
      aoC1K.style.backgroundColor = "";
      break;
    case 'HC1ao': 
      aoC1HC.style.backgroundColor = "black";
      break;
    case 'HC1aorem': 
      aoC1HC.style.backgroundColor = "";
      break;
    case 'H1ao': 
      aoC1H.style.backgroundColor = "black";
      break;
    case 'H1aorem': 
      aoC1H.style.backgroundColor = "";
      break;
    case 'C2ao': 
      aoC2C.style.backgroundColor = "black";
      break;
    case 'C2aorem': 
      aoC2C.style.backgroundColor = "";
      break;
    case 'K2ao': 
      aoC2K.style.backgroundColor = "black";
      break;
    case 'K2aorem': 
      aoC2K.style.backgroundColor = "";
      break;
    case 'HC2ao': 
      aoC2HC.style.backgroundColor = "black";
      break;
    case 'HC2aorem': 
      aoC2HC.style.backgroundColor = "";
      break;
    case 'H2ao': 
      aoC2H.style.backgroundColor = "black";
      break;
    case 'H2aorem': 
      aoC2H.style.backgroundColor = "";
      break;
    //reset
    case 'reset':
      warning.forEach((e) => {
        e.style.backgroundColor = "";
      });
      break;
  }
});


