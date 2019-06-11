const WebSocket = require('ws');
const http = require('http');

const {nodeHid} = require('./hid');
const {app} = require('./app');

function noop() {}
 
function heartbeat() {
  this.isAlive = true;
}

const server = http.createServer(app);

//const wss = new WebSocket.Server({ port: 8888 });
const wss = new WebSocket.Server({ server });
 
wss.on('connection', function connection(ws) {
  console.log('got something');
  ws.isAlive = true;
  ws.on('asynchronous-message', (req) => {
    console.log('req ', req);
  });

  ws.on('message', async msg => {
    
    console.log(typeof msg)
    const message = JSON.parse(msg);
    console.log(`Received message =>`, message.type )
    if (message.type == 'request') {

      const devices = await nodeHid.getDevices();
      const response = {
        type : 'reply',
        id: message.id,
        payload: {
          devices: devices 
        }
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


server.listen(8888);
