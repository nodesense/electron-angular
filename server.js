const WebSocket = require('ws');
 
function noop() {}
 
function heartbeat() {
  this.isAlive = true;
}
 
const wss = new WebSocket.Server({ port: 8888 });
 
wss.on('connection', function connection(ws) {
  console.log('got something');
  ws.isAlive = true;
  ws.on('asynchronous-message', (req) => {
    console.log('req ', req);
  });

  ws.on('message', msg => {
    
    console.log(typeof msg)
    const message = JSON.parse(msg);
    console.log(`Received message =>`, message.type )
    if (message.type == 'request') {

      const response = {
        type : 'reply',
        id: message.id,
        payload: {devices: [1, 2, 3, 4, 5, 6]}
      };
      console.log('sending reply for message.id');
      // ipcRenderer.send('asynchronous-message', response);
      ws.send(JSON.stringify(response));
    }
  })

   
});
 
const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
 
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);