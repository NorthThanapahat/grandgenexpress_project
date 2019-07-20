import { Component, OnInit } from '@angular/core';
import { WeDataProvider } from 'src/app/shared/we-data-provider';
import { ApiProvider } from 'src/app/shared/services/api';
import { ConfigApi } from 'src/app/shared/services/config';
import { UserManageMent, UserData } from 'src/app/model/response/user_manage';
import { UserDetails } from 'src/app/model/response/user_detail';
import { inquiryOrder } from 'src/app/model/response/inquiryOrder';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AlertMessageComponent } from 'src/app/alert-message/alert-message.component';
import { ShowimageComponent } from 'src/app/showimage/showimage.component';
import { ShowOrderdetailComponent } from 'src/app/modal/show-orderdetail/show-orderdetail.component';

@Component({
  selector: 'app-inquiry-invoice',
  templateUrl: './inquiry-invoice.component.html',
  styleUrls: ['./inquiry-invoice.component.scss']
})
export class InquiryInvoiceComponent implements OnInit {
  userDetail: UserDetails;
  userManage: UserManageMent;
  productofUser: Array<UserData> = [];
  inquiryOrder: inquiryOrder;
  userRef: string;
  statusInvoice: string;
  constructor(public weProvider: WeDataProvider,
    public api: ApiProvider,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.userDetail = this.weProvider.GetUserDetail();
    if (this.userDetail.ResponseData.userRole == "admin") {
      let data = {
        username: this.userDetail.ResponseData.username
      }

      this.GetUserManageMent(data);
    } else {
      if (this.userDetail.ResponseData.userRole == "shop") {
        let data = {
          username: this.userDetail.ResponseData.username
        }
        this.GetInvoice(data);

      } else {
        let data = {
          username: this.userDetail.ResponseData.userRef
        }
        this.GetInvoice(data);

      }

    }
  }
  ShowImage(image){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = "70%";
        dialogConfig.panelClass = "popup-modal"
          dialogConfig.data = { image: image };
        
        const dialogRef = this.dialog.open(ShowimageComponent, dialogConfig);

  }
  ShowDetail(value){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = "70%";
        dialogConfig.panelClass = "popup-modal"
          dialogConfig.data = { value };
        
        const dialogRef = this.dialog.open(ShowOrderdetailComponent, dialogConfig);
  }
  UserOption(value) {
    let data = {
      username: value
    }
    this.GetInvoice(data);
  }

  GetInvoice(data) {
    this.api.SendRequestApi(ConfigApi.InquiryOrder_url, data).then((res: any) => {
      this.inquiryOrder = <inquiryOrder>res;

      console.log(this.inquiryOrder);
    });
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
      let data = {
        username: this.userRef
      }
      this.GetInvoice(data);
      console.log(this.productofUser);
      console.log(this.userManage.ResponseData);

    });
  }
}
