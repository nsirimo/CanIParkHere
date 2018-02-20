import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  latCoords = 0.0;
  lonCoords = 0.0;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {}




  getLocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.latCoords = resp.coords.latitude;
    this.lonCoords = resp.coords.longitude;

    console.log(`Lat: ${this.latCoords} Long: ${this.lonCoords}`);
  }).catch((error) => {
    console.log('Error getting your location!', error);
  });

  }

}
