const electron = require('electron');
const {ipcRenderer} = electron;

function getZero(num) {
  if (num >= -1 && num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}
const setSeconds = document.querySelector('#set-seconds'),
      setMinutes = document.querySelector('#set-minutes');

setSeconds.addEventListener('input', () => {
  setSeconds.value = getZero(setSeconds.value);
});

setMinutes.addEventListener('input', () => {
  setMinutes.value = getZero(setMinutes.value);
});

document.querySelector('.time-setter').addEventListener('submit', (e) => {
  e.preventDefault();
  const minutes = setMinutes.value;
  const seconds = setSeconds.value;
  console.log(minutes);
  console.log(seconds);
  ipcRenderer.send('set-time', minutes, seconds);
});


const start = document.querySelector('#start'),
      stop = document.querySelector("#stop"),
      resetTime = document.querySelector("#reset-time"),
      add1 = document.querySelector("#add1"),
      add5 = document.querySelector("#add5"),
      add10 = document.querySelector("#add10"),
      rem1 = document.querySelector("#rem1"),
      rem5 = document.querySelector("#rem5"),
      rem10 = document.querySelector("#rem10");
let   value,
      resetValue;


start.addEventListener('click', () => {
  ipcRenderer.send('start');
});

stop.addEventListener('click', () => {
  ipcRenderer.send('stop');
});

resetTime.addEventListener('click', () => {
  ipcRenderer.send('reset-time');
});

add1.addEventListener('click', () => {
  let add = 1;
  ipcRenderer.send('change-time', add);
  console.log(add);
});

add5.addEventListener('click', () => {
  let add = 5;
  ipcRenderer.send('change-time', add);
  console.log(add);
});

add10.addEventListener('click', () => {
  let add = 10;
  ipcRenderer.send('change-time', add);
  console.log(add);
});

rem1.addEventListener('click', () => {
  let add = -1;
  ipcRenderer.send('change-time', add);
  console.log(add);
});

rem5.addEventListener('click', () => {
  let add = -5;
  ipcRenderer.send('change-time', add);
  console.log(add);
});

rem10.addEventListener('click', () => {
  let add = -10;
  ipcRenderer.send('change-time', add);
  console.log(add);
});

//score

const aka = document.querySelector(".aka"),
      yukoAka = aka.querySelector("#YUKO"),
      wazaariAka = aka.querySelector("#WAZA-ARI"),
      ipponAka = aka.querySelector("#IPPON"),
      minusAka = aka.querySelector("#minusPoint");

yukoAka.addEventListener('click', () => {
  const point = 1;
  ipcRenderer.send('score', point);
  console.log(point);
});

wazaariAka.addEventListener('click', () => {
  const point = 2;
  ipcRenderer.send('score', point);
  console.log(point);
});

ipponAka.addEventListener('click', () => {
  const point = 3;
  ipcRenderer.send('score', point);
  console.log(point);
});

minusAka.addEventListener('click', () => {
  const point = -1;
  ipcRenderer.send('score', point);
  console.log(point);
});

//warnings 

const akaC1 = aka.querySelectorAll('.akaC1'),
      akaC2 = aka.querySelectorAll('.akaC2');

akaC1.forEach((e) => {
  e.addEventListener('input', () => {
    if (e.checked) {
      ipcRenderer.send('warnings', e.value);
      console.log(e.value);
    } else {
      console.log(e.value + 'rem');
      ipcRenderer.send('warnings', e.value + 'rem');
    }
  });
});

akaC2.forEach((e) => {
  e.addEventListener('input', () => {
    if (e.checked) {
      ipcRenderer.send('warnings', e.value);
      console.log(e.value);
    } else {
      console.log(e.value + 'rem');
      ipcRenderer.send('warnings', e.value + 'rem');
    }
  });
});



const reset = document.querySelector("#reset");

reset.addEventListener('click', () => {
  ipcRenderer.send('reset');
  document.querySelectorAll('.checkbox').forEach((e) => {
    e.checked = false;
  });
});


document.querySelector('.add').addEventListener('click', () => {
  ipcRenderer.send('create');
});