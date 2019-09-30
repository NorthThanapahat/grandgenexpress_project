import { Component, OnInit } from '@angular/core';
import { WeDataProvider } from 'src/app/shared/we-data-provider';
import { ApiProvider } from 'src/app/shared/services/api';
import { UserDetails } from 'src/app/model/response/user_detail';
import { ConfigApi } from 'src/app/shared/services/config';
import { UserManageMent, UserData } from 'src/app/model/response/user_manage';
import { inquiryOrder } from 'src/app/model/response/inquiryOrder';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ReportDataComponent } from 'src/app/report-data/report-data.component';
import { Router } from '@angular/router';
import { EditInvoiceComponent } from 'src/app/modal/edit-invoice/edit-invoice.component';
import { AlertMessageComponent } from 'src/app/alert-message/alert-message.component';
import { AlertConfirmComponent } from 'src/app/modal/alert-confirm/alert-confirm.component';
import { UtilProvider } from 'src/app/shared/util';

@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrls: ['./manage-invoice.component.scss']
})
export class ManageInvoiceComponent implements OnInit {
  userDetail: UserDetails;
  userManage: UserManageMent;
  productofUser: Array<UserData> = [];
  inquiryOrder: inquiryOrder;
  order: any;
  statusInvoice: string;
  userSelect: string;
  userRef: string;
  saveData:Array<any>;
  constructor(
    private dialog: MatDialog,
    public weProvider: WeDataProvider,
    private utilProvider: UtilProvider,
    public router: Router,
    public api: ApiProvider) {


  }

  ngOnInit() {
    this.saveData = [];
    this.userDetail = this.weProvider.GetUserDetail();
    if (this.userDetail.ResponseData.userRole == "admin") {
      let data = {
        "username": this.userDetail.ResponseData.username
      }

      this.GetUserManageMent(data);
    }
  }
  StatusInvoice(value, item, i) {
    this.saveData.push(item);
    console.log(this.saveData);
  }
  UserOption(value) {
    this.userSelect = value;
    let data = {
      username: value
    }
    this.GetInvoice(data);
  }

  Filter(value) {
    console.log(value);
    this.order = this.filterOrders(value);
  }
  filterOrders(value) {
    return this.inquiryOrder.ResponseData.data.filter((item) => {
      return item.customerRefNo.toLowerCase().trim().indexOf(value.toLowerCase().trim()) > -1;
    })
  }
  Print(item) {
    this.dialog.open(ReportDataComponent, {
      width: "100%",
      height: "100%",
      panelClass: "modal-popup",
      data: item
    });

  }
  Edit(item) {

    let dialogRef = this.dialog.open(EditInvoiceComponent, {
      width: "80%",
      height: "80%",
      panelClass: "modal-normal",
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (this.userDetail.ResponseData.userRole == 'admin') {
        this.userRef = this.userSelect;
        let data = {
          username: this.userRef
        }
        this.GetInvoice(data);
      } else {

      }
      console.log('The dialog was closed');
    });
  }
  Delete(item) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.maxWidth = "70%";
    dialogConfig.panelClass = "popup-modal"
    dialogConfig.data = { title: "Warning", text: "Are you sure you want to delete this Invoice ?" };

    const dialogRef = this.dialog.open(AlertConfirmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'OK') {
        let data = {
          username: this.userRef,
          orderNo: item.orderNo,
          status: 'Cancelled order',
          orderDetail: {
            order: item.order,
            grandTotal: item.grandTotal
          }

        }
        this.api.SendRequestApi(ConfigApi.UpdateStatusInvoice_url, data).then((res: any) => {
          if (res.ResponseCode == "Success") {
            window.location.reload();
          }
        });
      }
      console.log('The dialog was closed');
    });

  }
  GetInvoice(data) {
    this.api.SendRequestApi(ConfigApi.InquiryOrder_url, data).then((res: any) => {
      this.inquiryOrder = <inquiryOrder>res;
      this.order = res.ResponseData.data;

      console.log(this.inquiryOrder);
    });
  }
  async save() {

    for (let i in this.saveData) {
      // let i = 0;
      console.log(this.saveData[i]);
      let data = {
        username: this.userRef,
        orderNo: this.saveData[i].orderNo,
        status: this.saveData[i].status,
        orderDetail: {
          order: this.saveData[i].order,
          grandTotal: this.saveData[i].grandTotal
        }
      }
      let error = false;
      console.log(data);
      // if (Number.parseInt(i) == this.saveData.length - 1) {
      //   if (!error) {
      //     let dialogRef = this.utilProvider.AlertMessage("Complete", "Update status Successful");
      //     dialogRef.afterClosed().subscribe(result => {
      //       window.location.reload();
      //     });
      //   }
      // }
      await this.api.SendRequestApi(ConfigApi.UpdateStatusInvoice_url, data).then((res: any) => {
        if (res.ResponseCode == "Error") {
          error = true;
        }
        if (Number.parseInt(i) == this.saveData.length - 1) {
          if (!error) {
            let dialogRef = this.utilProvider.AlertMessage("Complete", "Update status Successful");
            dialogRef.afterClosed().subscribe(result => {
              window.location.reload();
            });
          }
        }
      });
    }

  }
  GetUserManageMent(data) {
    this.api.SendRequestApi(ConfigApi.userManageMent_url, data).then(async (result: any) => {
      this.userManage = <UserManageMent>result;
      for (let item of this.userManage.ResponseData) {
        if (item.userRole == 'shop') {
          this.productofUser.push(item);
        }
      }
      this.userRef = this.productofUser[0].username;
      this.userSelect = this.userRef;
      let data = {
        username: this.userRef
      }
      this.GetInvoice(data);
      console.log(this.productofUser);
      console.log(this.userManage.ResponseData);

    });
  }

}
