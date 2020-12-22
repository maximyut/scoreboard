const electron = require('electron');
    const {ipcRenderer} = electron;

    const ul = document.querySelector('ul');

    ipcRenderer.on('item:add', function(e, item){
      ul.className = 'collection';
      const li = document.createElement('li');
      li.className = 'collection-item';
      const itemText = document.createTextNode(item);
      console.log(itemText);
      li.appendChild(itemText);
      ul.appendChild(li);
    });