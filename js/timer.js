let minutes = 2,
    seconds = 11,
    total = minutes * 60 + seconds;

function update() {
  function newNumber () {
    total = total - 1;
    seconds = Math.floor(total % 60);
    minutes = Math.floor((total / 60) % 60);
    function getZero(num) {
      if (num >= 0 && num < 10) {
        return '0' + num;
      } else {
        return num;
      }
    }
    console.log(getZero(minutes));
    console.log(getZero(seconds));
    
    if (total <= 0) {
      clearInterval(timeInterval);
    }
  }
  let timeInterval = setInterval(newNumber, 1000);
}

update();