import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
/*import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';*/
import { AuthData } from '../../providers/auth-data/auth-data';

@Component({
  templateUrl: 'build/pages/landing/landing.html',
})
export class LandingPage {

  constructor(private navCtrl: NavController, public authData: AuthData, public loadingCtrl: LoadingController) {}

  /*goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToBillList(){
    this.authData.anonymousLogin().then( user => {
      this.navCtrl.push(HomePage);
    });
    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    loading.present();
  }*/

}
