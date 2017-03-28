import { Component, OnInit } from '@angular/core';

import { Push, PushToken } from '@ionic/cloud-angular';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, public push: Push) {

  }

  ngOnInit() {
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
  }
}
