import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  fireAuth:firebase.User;
  
  constructor(public af: AngularFire) {
    af.auth.subscribe( user => {
      if (user) { 
        this.fireAuth = user.auth; 
      }
    });
  }

  getUser():firebase.User { return this.fireAuth; }

  loginUser(newEmail: string, newPassword: string):firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({
      email: newEmail,
      password: newPassword
    });
  }

  anonymousLogin():firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    });
  }

  linkAccount(email: string, password: string):firebase.Promise<FirebaseAuthState> {
    const userProfile = firebase.database().ref('/userProfile');
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return firebase.auth().currentUser.link(credential).then( user => {
      userProfile.child(user.uid).update({
        email: email
      });
    }, error => {
      console.log("There was an error linking the account", error);
    });
  }

  resetPassword(email: string):firebase.Promise<FirebaseAuthState> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():firebase.Promise<void> { return this.af.auth.logout(); }
}
