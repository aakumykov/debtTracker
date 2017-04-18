import { Injectable } from '@angular/core';
import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';

import firebase from 'firebase';

@Injectable()
export class BillProvider {
  public billList: FirebaseListObservable<any>;
  public billDetail: FirebaseObjectObservable<any>;
  public userId: string;

  constructor(public af: AngularFire) {
    af.auth.subscribe( auth => {
      if (auth){
        this.billList = af.database.list(`/userProfile/${auth.uid}/billList`);
        this.userId = auth.uid;
      }
    });
  }

  getBillList(): FirebaseListObservable<any> { return this.billList; }

  getBill(billId: string): FirebaseObjectObservable<any> {
    return this.billDetail = this.af.database
      .object(`/userProfile/${this.userId}/billList/${billId}`);
  }

  createBill(name: string, amount: number, dueDate: string = null, paid: boolean = false){
    return this.billList.push({ name, amount, dueDate, paid });
  }

  removeBill(billId: string): any { return this.billList.remove(billId); }

  payBill(billId: string): any { return this.billList.update(billId, {paid: true}); }

  takeBillPhoto(billId: string, imageURL: string): any {
    const storageRef = firebase.storage().ref(this.userId);
    return storageRef.child(billId).child('billPicture')
      .putString(imageURL, 'base64', {contentType: 'image/png'})
      .then( pictureSnapshot => {
        this.billList.update(billId, { picture: pictureSnapshot.downloadURL });
      });
  }

}
