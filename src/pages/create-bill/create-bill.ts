import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { BillData } from '../../providers/bill-data';

@Component({
  templateUrl: 'create-bill.html',
})
export class CreateBillPage {
  public newBillForm;
  nameChanged: boolean = false;
  amountChanged: boolean = false;
  dueDateChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public billData: BillData, public formBuilder: FormBuilder) {
    this.newBillForm = formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  createBill(){
    this.submitAttempt = true;

    if (!this.newBillForm.valid){
      console.log(this.newBillForm.value);
    } else {
      this.billData.createBill(this.newBillForm.value.name, this.newBillForm.value.amount,
        this.newBillForm.value.dueDate).then( () => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });

    }
  }

}
