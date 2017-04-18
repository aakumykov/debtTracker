import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
    public authProvider: AuthProvider) {
  }

  goToLogin(){ 
    this.navCtrl.push('LoginPage');
  }

  goToBillList(){
    this.authProvider.anonymousLogin().then( () => {
      loading.dismiss().then( () => {
        this.navCtrl.setRoot(HomePage);
      });
    });

    const loading = this.loadingCtrl.create();
    loading.present();
  }


}
