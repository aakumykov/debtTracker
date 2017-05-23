import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { BillProvider } from '../providers/bill/bill';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyALKfevapBOYK202f6k5mPPfMrT1MHDv5A",
    authDomain: "bill-tracker-e5746.firebaseapp.com",
    databaseURL: "https://bill-tracker-e5746.firebaseio.com",
    storageBucket: "bill-tracker-e5746.appspot.com",
    messagingSenderId: "508248799540"
};

class CameraMock extends Camera {
  getPicture(options){
    return new Promise( (resolve, reject) => {
      resolve(`iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABmJLR0QAA
        AAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUklEQVR4nGM4QAFgAOL/uMG
        7d+8gJCZAaMZrARaArhmXzVjtpLtmiAiZmiH6ydf8jhKbqaoZzscEWE2E2zeqeWA0k
        wRQNOMCWG2G28+A1wICAAAS2y1ybs6L0AAAAABJRU5ErkJggg==`);
    });
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: Camera, useClass: CameraMock},
    {provide: ErrorHandler, useClass: IonicErrorHandler}, AuthProvider, BillProvider
  ]
})
export class AppModule {}
