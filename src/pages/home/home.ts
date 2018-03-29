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
      alert('Oh noes! It looks like you may have blocked CanIParkHere from getting your geolocation. Try again.');
    });
  }

  dropPin(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.renderLocation();
  }

  renderLocation(){
    // var location = '22 Main st Boston MA';
    // axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    //   parameters: {
    //     address: location,
    //     key: 'AIzaSyC8HflTKNC5-IDgtzYkJNOf6pZeZLaykLc'
    //   }
    // });
  }

}
