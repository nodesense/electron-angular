import { Observable, Subject } from "rxjs";

export abstract class DeviceService {
    requestMap: { [key: string]: Subject<any>} = {};

 
   showPendingCalls() {
    console.log('pending ' + Object.keys(this.requestMap));
  }

  abstract isElectron(): boolean;


  abstract send(data);


  getDeviceList(): Observable<any> {
    console.log('getDeviceList called');
    const subject = new Subject<any>();
    const id = Math.floor(Math.random() * 1000000000).toString();

    const request = {
      type : 'request',
      id: id,
      payload: {t: 9000}
    };
    this.requestMap[id] = subject;

    this.send(request);

    return subject.asObservable();
  }
 
  
}