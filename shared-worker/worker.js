var count = 0;

onconnect = function(e) {
  var port = e.ports[0];

  port.onmessage = function(e) {
    var workerResult = `Result${count++}: ` + (e.data[0] * e.data[1]);
    port.postMessage(workerResult);
  }

}
