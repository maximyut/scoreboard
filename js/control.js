const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

document.querySelector('form').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  const item = document.querySelector('#item').value;
  console.log(ipcRenderer);
  console.log(item);
  ipcRenderer.send('item:add', item);
}