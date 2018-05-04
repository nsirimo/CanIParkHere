import { ApiService } from './apiService.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FindParkingPage } from '../pages/find-parking/find-parking';
import { AddPlacePage } from '../pages/add-place/add-place';
import { GroundOverlayPage } from '../pages/ground-overlay/ground-overlay';
import { MapPage } from '../pages/map/map';
import { SetLocationPage } from '../pages/set-location/set-location';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FindParkingPage,
    AddPlacePage,
    MapPage,
    SetLocationPage,
    
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC8HflTKNC5-IDgtzYkJNOf6pZeZLaykLc' // This is the unique Google Maps API key
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FindParkingPage,
    AddPlacePage,
    MapPage,
    SetLocationPage,
    
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
