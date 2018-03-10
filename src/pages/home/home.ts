import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Insert default coordinates
  latitude: number = 40.730610;
  longitude: number = -73.935242;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {}

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      alert('Nuckin futs! It looks like you may have blocked CanIParkHere from getting your geolocation. Try again');
    });
  }

  dropPin(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

}
