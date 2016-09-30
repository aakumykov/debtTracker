import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { BillData } from '../../providers/bill-data/bill-data';

@Component({
  templateUrl: 'build/pages/create-bill/create-bill.html',
  providers: [BillData]
})
export class CreateBillPage {
  public newBillForm: ControlGroup;
  nameChanged: boolean = false;
  amountChanged: boolean = false;
  dueDateChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(private navCtrl: NavController, public billData: BillData, public formBuilder: FormBuilder) {
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
