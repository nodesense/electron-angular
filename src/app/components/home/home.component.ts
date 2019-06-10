import { ElectronService } from './../../providers/electron.service';
import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../providers/device.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
   
  }

  call() {
    this.deviceService
    .getDeviceList()
    .subscribe( response => {
      console.log('got the response ', response);
    });
  }

  showPendingCalls() {
    this.deviceService.showPendingCalls();
  }

}
