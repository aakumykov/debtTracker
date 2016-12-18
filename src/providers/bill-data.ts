import { Injectable } from '@angular/core';
import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class BillData {
  billList: FirebaseListObservable<any>;
  billDetail: FirebaseObjectObservable<any>;
  userId: string;

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
    return this.billList.push({ name, amount, dueDate });
  }

  removeBill(billId: string): any { return this.billList.remove(billId); }

  payBill(billId: string): any { return this.billList.update(billId, {paid: true}); }

  

}
