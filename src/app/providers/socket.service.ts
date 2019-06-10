import { DeviceService } from './device.service';
import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SocketService extends DeviceService {
 
  constructor() {
    super();
    
  }


  send(request) {
    var ws = new WebSocket("ws://localhost:8888");
				
    ws.onopen = function() {
      
      // Web Socket is connected, send data using send()
      ws.send(JSON.stringify(request));

      // alert("Message is sent...");
    };

    ws.onmessage =   (evt) => { 
      var received_msg = evt.data;
      // alert("Message is received..." + JSON.stringify(evt.data));

      const arg = JSON.parse(received_msg);
      if (arg && arg.type === 'reply') {
        if (arg.id in this.requestMap) {
          this.requestMap[arg.id].next(arg);
          this.requestMap[arg.id].complete();
          delete this.requestMap[arg.id];
        }
      }

    };

    ws.onclose = function() { 
      
      // websocket is closed.
    //  alert("Connection is closed..."); 
    };

    console.log('send over websocket');
    }

    isElectron = () => {
        return false;
      }
}
