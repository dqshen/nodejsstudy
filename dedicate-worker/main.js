const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');

//用window.Worker判断浏览器是否支持Worker API
if (window.Worker) {
  const myWorker = new Worker("worker.js");

  first.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  second.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log('Message received from worker');
  }

  myWorker.onerror = function(e) {
    result.textContent = e.filename;
    console.log('Error received from worker');
  }
} else {
  console.log('Your browser doesn\'t support web workers.');
}
