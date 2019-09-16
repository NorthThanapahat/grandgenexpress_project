import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiProvider } from 'src/app/shared/services/api';
import { ConfigApi } from 'dist/app/shared/services/config';
import { inquiryOrder } from 'src/app/model/response/inquiryOrder';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {
  isCOD = false;
  different;
  err = {
    isErr: false,
    date: false,
    customerName: false,
    customerMobileNo: false,
    customerAddress: false,
    user: false,
    quantity: false,
    paymentType: false,
    noProduct: false,
    amount: false
  }
  constructor(public dialogRef: MatDialogRef<EditInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiProvider) { }

  ngOnInit() {
    this.isCOD = this.data.cod == 1 ? true : false;
    this.different = Number.parseFloat(this.data.amount) - Number.parseFloat(this.data.grandTotal);
    for (let item of this.data.order) {
      item.totalPrice = (Number.parseFloat(item.itemPrice) * Number.parseFloat(item.quantity)).toString();
    }
    console.log(this.data)
  }
  QuantityOnChange(value, itemPrice, index) {
    if (Number.parseFloat(this.data.totalQuantity) > 0) {
      this.err.quantity = false;
    }
    if (Number.parseFloat(this.data.amount) > Number.parseFloat(this.data.grandTotal)) {
      this.err.amount = false;
    }
    this.data.order[index].totalPrice = (Number.parseFloat(itemPrice) * Number.parseFloat(value)).toString();
    this.data.totalCharge = 0;
    for (let item of this.data.order) {
      this.data.totalCharge += Number.parseFloat(item.totalPrice);
    }
    this.data.grandTotal = this.SUMTotal();
  }

  SUMTotal() {
    console.log(this.data.addCharge)

    if (this.data.discount == null) {
      this.data.discount = "0";
    }
    if (this.data.addCharge == null) {
      this.data.addCharge = "0";
    }
    if (this.data.additionalCost == null) {
      this.data.additionalCost = "0";
    }
    if (this.data.shippingFee == null) {
      this.data.shippingFee = "0";
    }
    if (this.data.amount == null) {
      this.data.amount = "0";
    }
    this.data.codCost = 0;
    if (this.isCOD)
      this.data.codCost = (this.data.totalCharge - this.data.discount) * 0.03;
    else
      this.data.codCost = 0;
    let total = Number.parseFloat(this.data.totalCharge) - Number.parseFloat(this.data.discount) + Number.parseFloat(this.data.addCharge) - Number.parseFloat(this.data.codCost) - Number.parseFloat(this.data.additionalCost) - Number.parseFloat(this.data.shippingFee);
    this.data.grandTotal = total;
    this.different = Number.parseFloat(this.data.amount) - Number.parseFloat(this.data.grandTotal);

    return total;
  }
  save() {
    console.log(this.data);
    if (this.data.totalQuantity > 0) {
      if (Number.parseFloat(this.data.amount) > Number.parseFloat(this.data.grandTotal)) {
        this.EditInvoice(this.data);
      } else {
        this.err.amount = false;
      }
    } else {
      this.err.quantity = true;
    }

  }
  async EditInvoice(data) {
    await this.api.SendRequestApi(ConfigApi.editInvoice_url, data).then((res: any) => {

      if (res.ResponseCode == "Success") {
        this.dialogRef.close("success");
      }

    });
  }
  cancle() {
    this.dialogRef.close("close");
  }
}
