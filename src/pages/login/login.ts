import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
    public authProvider: AuthProvider, public formBuilder: FormBuilder, 
    public alertCtrl: AlertController) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.minLength(6), 
          Validators.required])]
      });
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, 
        this.loginForm.value.password).then( () => {
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot(HomePage);
          });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
