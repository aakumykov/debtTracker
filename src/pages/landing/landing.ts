import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
    public authData: AuthData) {}

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToBillList(){
    this.authData.anonymousLogin().then( () => {
      console.log("Anonymous Login Successful");
    });

    const loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    loading.present();
  }

}
