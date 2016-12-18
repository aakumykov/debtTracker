import { Component } from '@angular/core';
import { 
  NavController, 
  NavParams, 
  ActionSheetController, 
  Platform, 
  AlertController } from 'ionic-angular';
import { BillData } from '../../providers/bill-data';

@Component({
  selector: 'page-bill-detail',
  templateUrl: 'bill-detail.html'
})
export class BillDetailPage {
  public bill: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public platform: Platform, public actionCtrl: ActionSheetController, 
    public billData: BillData, public alertCtrl: AlertController) {

      this.billData.getBill(this.navParams.get("billId"))
        .subscribe( billSnap => { this.bill = billSnap });
    }

  showOptions(billId){
    const action = this.actionCtrl.create({
      title: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.billData.removeBill(billId)
              .then( () => { this.navCtrl.pop(); });
          }
        },
        {
          text: 'Mark as Paid!',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.billData.payBill(billId);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    action.present();
  }

}
