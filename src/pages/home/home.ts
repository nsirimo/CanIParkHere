import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Insert default coordinates
  latitude: number = 51.678418;
  longitude: number = 7.809007;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {}

  getLocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
  }).catch((error) => {
    console.log('Error getting your location!', error);
  });

  }

}
