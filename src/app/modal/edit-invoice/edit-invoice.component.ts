import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {
  isCOD = false;
  different;
  amount;
  err = {
    isErr: false,
    date: false,
    customerName: false,
    customerMobileNo: false,
    customerAddress: false,
    user: false,
    quantity: false,
    paymentType: false,
    noProduct: false
  }
  constructor(public dialogRef: MatDialogRef<EditInvoiceComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.isCOD = this.data.cod == 1 ? true : false;
    this.different = "0";
    this.amount = Number.parseFloat(this.data.grandTotal);
    for(let item of this.data.order){
      item.totalPrice = (Number.parseFloat(item.itemPrice) * Number.parseFloat(item.quantity)).toString();
    }
    console.log(this.data)
  }
  QuantityOnChange(value, itemPrice, index) {
    this.data.order[index].totalPrice =  (Number.parseFloat(itemPrice) * Number.parseFloat(value)).toString();
    this.data.totalCharge = 0;
    for(let item of this.data.order){
      this.data.totalCharge += Number.parseFloat(item.totalPrice); 
    }
    this.data.grandTotal = this.SUMTotal();
  }
  
  SUMTotal() {
    
    this.data.codCost = 0;
    if (this.isCOD)
      this.data.codCost = (this.data.totalCharge - this.data.discount) * 0.03;
    else
      this.data.codCost = 0;
    let total = Number.parseFloat(this.data.totalCharge) - Number.parseFloat(this.data.discount) + Number.parseFloat(this.data.addCharge) - Number.parseFloat(this.data.codCost) - Number.parseFloat(this.data.additionalCost) - Number.parseFloat(this.data.shippingFee);
    this.different = "0"
    this.data.grandTotal = total;
    this.amount = Number.parseFloat(this.data.grandTotal);
    return total;
  }
  save(){
    console.log(this.data);
  }
  cancle(){
    this.dialogRef.close("close");
  }
}
