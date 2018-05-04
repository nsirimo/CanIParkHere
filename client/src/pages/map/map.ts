import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  searchBar : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.searchBar = new FormGroup({
      region: new FormControl()
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  getRegionData(){
    
  }

}
