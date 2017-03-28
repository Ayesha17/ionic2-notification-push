import { Component, OnInit } from '@angular/core';

import { Push, PushToken } from '@ionic/cloud-angular';

import {NavController, Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, public platform: Platform, public push: Push) {

  }

  ngOnInit() {
    // Push is not supported in the browser. So only activate it when on a real device (android for now)
    if (this.platform.is('android')) {
      // Directly register the device when we render the home page
      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
      });

      // Listen to push notifications
      this.push.rx.notification().subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });
    } else {
      console.log('No push notification for current target. Deploy to Android to test!!');
    }
  }
}
