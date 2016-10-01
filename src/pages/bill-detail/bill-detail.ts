import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { BillData } from '../../providers/bill-data';
import { AuthData } from '../../providers/auth-data';
import { Camera } from 'ionic-native';
import { SignupPage } from '../signup/signup';


@Component({
  templateUrl: 'bill-detail.html',
})
export class BillDetailPage {
  public bill: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public actionCtrl: ActionSheetController, public billData: BillData, public authData: AuthData,
    public alertCtrl: AlertController) {

    this.billData.getBill(this.navParams.get('billId')).subscribe( billSnap => {
      this.bill = billSnap;
    });

  }

  uploadPicture(billId){
    if(this.authData.getUser().isAnonymous == true){
      let alert = this.alertCtrl.create({
        message: "If you want to continue you'll need to provide an email and create a password",
        buttons: [
          { text: "Cancel" },
          {
            text: "OK",
            handler: data => {
              this.navCtrl.push(SignupPage);
            }
          }
        ]
      });
      alert.present();
    } else {
      Camera.getPicture({
        quality : 95,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      }).then(imageData => {
        this.billData.takeBillPhoto(billId, imageData);
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
    }
  }

  showOptions(billId){
    let action = this.actionCtrl.create({
      title: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.billData.removeBill(billId).then( () => {
              this.navCtrl.pop();
            });
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
