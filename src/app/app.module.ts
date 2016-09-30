import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// Importing pages
import { LandingPage } from '../pages/landing/landing';
import { BillDetailPage } from '../pages/bill-detail/bill-detail';
import { CreateBillPage } from '../pages/create-bill/create-bill';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';

// Importing providers
import { AuthData } from '../providers/auth-data/auth-data';
import { BillData } from '../providers/bill-data/bill-data';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAah-h8dK9UEpGH2gJMem8RHmigyPOGRbk",
  authDomain: "catalogo-fuxion-1e502.firebaseapp.com",
  databaseURL: "https://catalogo-fuxion-1e502.firebaseio.com",
  storageBucket: "catalogo-fuxion.appspot.com",
  messagingSenderId: "471741240034"
};

@NgModule({
  declarations: [
    MyApp,
    LandingPage,
    BillDetailPage,
    CreateBillPage,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    BillDetailPage,
    CreateBillPage,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage
  ],
  providers: [
    AuthData,
    BillData
  ]
})
export class AppModule {}
