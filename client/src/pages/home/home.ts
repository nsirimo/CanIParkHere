import { ApiService } from '../../app/apiService.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';

import { Geolocation } from '@ionic-native/geolocation';

import axios from 'axios';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchBar : FormGroup;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public apiService: ApiService) {
    this.searchBar = new FormGroup({
        address: new FormControl()
    });
  }
  
  // Grabs the user input from the search bar and returns an object storing the location data
  getLocationData() {
    const location = this.searchBar.value.address;

    var locationData = {
      premise: null,
      street_number: null,
      ShortName: null,
      locality: null,
      administrative_area_level_2: null,
      administrative_area_level_1: null,
      country: null,
      postal_code: null,
      latitude: null,
      longitude: null,
      formatted_address: null
    }

    var axioGet = axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          key: 'AIzaSyC8HflTKNC5-IDgtzYkJNOf6pZeZLaykLc'
        }
      })
      .then(function(response) {
        const result = response.data.results[0];
        
        // Get the address components of the current location
        const addressComponents = result.address_components;
        for (var i = 0; i < addressComponents.length; i++) {
          const key = addressComponents[i].types[0];      // Description of the address component
          const value = addressComponents[i].short_name;  // Actual value of the address component
          switch (key) {
            case "premise": locationData.premise = value; break;
            case "street_number": locationData.street_number = value; break;
            case "route": locationData.ShortName = value; break;
            case "locality": locationData.locality = value; break;
            case "administrative_area_level_2": locationData.administrative_area_level_2 = value; break;
            case "administrative_area_level_1": locationData.administrative_area_level_1 = value; break;
            case "country": locationData.country = value; break;
            case "postal_code": locationData.postal_code = value; break;
          }
        }
        locationData.latitude = result.geometry.location.lat;
        locationData.longitude = result.geometry.location.lng;
        locationData.formatted_address = result.formatted_address;
      })
      .catch(function(error){
        console.log(error);
      });

      axioGet.then(() => {
        this.apiService.sendLocationData(locationData);
      });
  }
}