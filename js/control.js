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
      setMinutes = document.querySelector('#set-minutes'),
      minutesValue = document.querySelector('#minutes'),
      secondsValue = document.querySelector('#seconds');

setSeconds.addEventListener('input', () => {
  setSeconds.value = getZero(setSeconds.value);
});

setMinutes.addEventListener('input', () => {
  setMinutes.value = getZero(setMinutes.value);
});

document.querySelector('.time-setter').addEventListener('submit', (e) => {
  e.preventDefault();
  m = setMinutes.value;
  s = setSeconds.value;
  minutesValue.textContent = setMinutes.value;
  secondsValue.textContent = setSeconds.value;
  ipcRenderer.send('set-time', minutesValue.textContent, secondsValue.textContent);
  total = Math.floor(Number(m) * 60 + Number(s));
  return m, s;
});

let total,
    m,
    s,
    minutes,
    seconds,
    ok,
    timeInterval;

function update() {
  function newNumber () {

    total = total - 1;
    minutes = Math.floor(total / 60);
    seconds = Math.floor(total - (minutes * 60));

    minutesValue.textContent = getZero(minutes);
    secondsValue.textContent = getZero(seconds);
    ipcRenderer.send('set-time', minutesValue.textContent, secondsValue.textContent);
    
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
  timeInterval = setInterval(newNumber, 1000);
}


const start = document.querySelector('#start'),
      stop = document.querySelector("#stop"),
      resetTime = document.querySelector("#reset-time"),
      add1 = document.querySelector("#add1"),
      add5 = document.querySelector("#add5"),
      add10 = document.querySelector("#add10"),
      rem1 = document.querySelector("#rem1"),
      rem5 = document.querySelector("#rem5"),
      rem10 = document.querySelector("#rem10");

start.addEventListener('click', () => {
  update();
});

stop.addEventListener('click', () => {
  clearInterval(timeInterval);
});

resetTime.addEventListener('click', () => {
  clearInterval(timeInterval);
  clearInterval(ok);
  total = Math.floor(Number(m) * 60 + Number(s));
  minutesValue.textContent = m;
  secondsValue.textContent = s;
  ipcRenderer.send('set-time', minutesValue.textContent, secondsValue.textContent);
});

function changeTime(add) {
  total = total + add;
  minutes = Math.floor(total / 60);
  seconds = Math.floor(total - (minutes * 60));
  minutesValue.textContent = getZero(minutes);
  secondsValue.textContent = getZero(seconds);
  ipcRenderer.send('set-time', minutesValue.textContent, secondsValue.textContent);
}

add1.addEventListener('click', () => {
  let add = 1;
  changeTime(add);
});

add5.addEventListener('click', () => {
  let add = 5;
  changeTime(add);
});

add10.addEventListener('click', () => {
  let add = 10;
  changeTime(add);
});

rem1.addEventListener('click', () => {
  let add = -1;
  changeTime(add);
});

rem5.addEventListener('click', () => {
  let add = -5;
  changeTime(add);
});

rem10.addEventListener('click', () => {
  let add = -10;
  changeTime(add);
});

//score

const aka = document.querySelector(".aka"),
      yukoAka = aka.querySelector("#YUKO"),
      wazaariAka = aka.querySelector("#WAZA-ARI"),
      ipponAka = aka.querySelector("#IPPON"),
      minusAka = aka.querySelector("#minusPoint"),
      akaScore = aka.querySelector('.score');

yukoAka.addEventListener('click', () => {
  const point = 1;
  akaScore.textContent = Math.floor(Number(akaScore.textContent) + point);
  ipcRenderer.send('score', akaScore.textContent, aoScore.textContent);
});

wazaariAka.addEventListener('click', () => {
  const point = 2;
  akaScore.textContent = Math.floor(Number(akaScore.textContent) + point);
  ipcRenderer.send('score', akaScore.textContent, aoScore.textContent);
});

ipponAka.addEventListener('click', () => {
  const point = 3;
  akaScore.textContent = Math.floor(Number(akaScore.textContent) + point);
  ipcRenderer.send('score', akaScore.textContent, aoScore.textContent);
});

minusAka.addEventListener('click', () => {
  const point = -1;
  akaScore.textContent = Math.floor(Number(akaScore.textContent) + point);
  ipcRenderer.send('score', akaScore.textContent, aoScore.textContent);
});

const ao = document.querySelector(".ao"),
      yukoAo = ao.querySelector("#YUKO"),
      wazaariAo = ao.querySelector("#WAZA-ARI"),
      ipponAo = ao.querySelector("#IPPON"),
      minusAo = ao.querySelector("#minusPoint"),
      aoScore = ao.querySelector('.score');

yukoAo.addEventListener('click', () => {
  const point = 1;
  aoScore.textContent = Math.floor(Number(aoScore.textContent) + point);
  ipcRenderer.send('score', akaScore.textContent, aoScore.textContent);
});

wazaariAo.addEventListener('click', () => {
  const point = 2;
  aoScore.textContent = Math.floor(Number(aoScore.textContent) + point);
  ipcRenderer.send('score', akaScore.textContent, aoScore.textContent);
});

ipponAo.addEventListener('click', () => {
  const point = 3;
  aoScore.textContent = Math.floor(Number(aoScore.textContent) + point);
  ipcRenderer.send('score', akaScore.textContent, aoScore.textContent);
});

minusAo.addEventListener('click', () => {
  const point = -1;
  aoScore.textContent = Math.floor(Number(aoScore.textContent) + point);
  ipcRenderer.send('score', akaScore.textContent,  aoScore.textContent);
});

//warnings 

const akaC1 = aka.querySelectorAll('.C1'),
      akaC2 = aka.querySelectorAll('.C2'),
      aoC1 = ao.querySelectorAll('.C1'),
      aoC2 = ao.querySelectorAll('.C2');

akaC1.forEach((e) => {
  e.addEventListener('input', () => {
    if (e.checked) {
      ipcRenderer.send('warnings', e.value + 'aka');
      console.log(e.value);
    } else {
      console.log(e.value + 'rem');
      ipcRenderer.send('warnings', e.value + 'aka' + 'rem');
    }
  });
});

akaC2.forEach((e) => {
  e.addEventListener('input', () => {
    if (e.checked) {
      ipcRenderer.send('warnings', e.value + 'aka');
      console.log(e.value);
    } else {
      console.log(e.value + 'rem');
      ipcRenderer.send('warnings', e.value + 'aka' + 'rem');
    }
  });
});

aoC1.forEach((e) => {
  e.addEventListener('input', () => {
    if (e.checked) {
      ipcRenderer.send('warnings', e.value + 'ao');
      console.log(e.value);
    } else {
      console.log(e.value + 'rem');
      ipcRenderer.send('warnings', e.value + 'ao' + 'rem');
    }
  });
});

aoC2.forEach((e) => {
  e.addEventListener('input', () => {
    if (e.checked) {
      ipcRenderer.send('warnings', e.value + 'ao');
      console.log(e.value);
    } else {
      console.log(e.value + 'rem');
      ipcRenderer.send('warnings', e.value + 'ao' + 'rem');
    }
  });
});


const reset = document.querySelector("#reset");

reset.addEventListener('click', () => {
  clearInterval(timeInterval);
  clearInterval(ok);
  secondsValue.classList.remove('hide');
  minutesValue.textContent = m;
  secondsValue.textContent = s;
  total = Math.floor(Number(m) * 60 + Number(s));
  akaScore.textContent = 0;
  aoScore.textContent = 0;
  ipcRenderer.send('score', akaScore.textContent, aoScore.textContent);
  ipcRenderer.send('warnings', 'reset');
  document.querySelectorAll('.checkbox').forEach((e) => {
    e.checked = false;
  });
});


document.querySelector('.add').addEventListener('click', () => {
  ipcRenderer.send('create');
});