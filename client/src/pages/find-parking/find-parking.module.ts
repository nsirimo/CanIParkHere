import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindParkingPage } from './find-parking';

@NgModule({
  declarations: [
    FindParkingPage,
  ],
  imports: [
    IonicPageModule.forChild(FindParkingPage),
  ],
})
export class FindParkingPageModule {}
