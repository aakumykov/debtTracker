import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var firebase;
@Injectable()
export class BillData {
  public billList: FirebaseListObservable<any>;
  public billDetail: FirebaseObjectObservable<any>;
  public userId: string;
  storageRef: any;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.billList = this.af.database.list('/userProfile/' + auth.uid + '/billList');
        this.storageRef = firebase.storage().ref(auth.uid);
        this.userId = auth.uid;
      }
    });

  }

  getBillList(){
    return this.billList;
  }

  getBill(billId: string){
    return this.billDetail = this.af.database.object('/userProfile/' + this.userId + '/billList/' + billId);
  }

  createBill(name: string, amount: number, dueDate: string = null){
    return this.billList.push({
      name: name,
      amount: amount,
      dueDate: dueDate,
      paid: false
    });
  }

  removeBill(billId: string){
    return this.billList.remove(billId);
  }

  payBill(billId: string){
    return this.billList.update(billId, {
      paid: true
    });
  }

  takeBillPhoto(billId: string, imageURL: string){
    return this.storageRef.child(billId).child('billPicture')
      .putString(imageURL, 'base64', {contentType: 'image/png'})
        .then( pictureSnapshot => {
          this.billList.update(billId, {
            picture: pictureSnapshot.downloadURL
        });
      });
  }

}
