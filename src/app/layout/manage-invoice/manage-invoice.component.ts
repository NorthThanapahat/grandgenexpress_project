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
  statusInvoice:string;

  userRef: string;
  constructor(
    private dialog: MatDialog,
    public weProvider: WeDataProvider,
    public router: Router,
    public api: ApiProvider) {


  }

  ngOnInit() {
    this.userDetail = this.weProvider.GetUserDetail();
    if (this.userDetail.ResponseData.userRole == "admin") {
      let data = {
        "username": this.userDetail.ResponseData.username
      }

      this.GetUserManageMent(data);
    }
  }
  StatusInvoice(value,item,i){
    this.inquiryOrder.ResponseData.data[i].status = value;
  }
  UserOption(value) {
    let data = {
      username: value
    }
  this.GetInvoice(data);
  }
  Print(item) {
    this.dialog.open(ReportDataComponent, {
      width: "100%",
      height: "100%",
      panelClass: "modal-popup",
      data: item
    });
   
  }
  Edit(item){
    
    this.dialog.open(EditInvoiceComponent, {
      width: "80%",
      height: "80%",
      panelClass: "modal-normal",
      data: item
    });
  }
  GetInvoice(data){
    this.api.SendRequestApi(ConfigApi.InquiryOrder_url, data).then((res: any) => {
      this.inquiryOrder = <inquiryOrder>res;
      
      console.log(this.inquiryOrder);
    });
  }
  save(){

    for(let i in this.inquiryOrder.ResponseData.data){
      // let i = 0;
      console.log(this.inquiryOrder.ResponseData.data[i]);
      let data = {
        username:this.userRef,
        orderNo:this.inquiryOrder.ResponseData.data[i].orderNo,
        status:this.inquiryOrder.ResponseData.data[i].status,
        orderDetail:{
            order:this.inquiryOrder.ResponseData.data[i].order,
            grandTotal:this.inquiryOrder.ResponseData.data[i].grandTotal        }
        
      }
      this.api.SendRequestApi(ConfigApi.UpdateStatusInvoice_url,data).then((res:any)=>{
        if(res.ResponseCode == "Success"){
          window.location.reload();
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
      let data = {
        username: this.userRef
      }
      this.GetInvoice(data);
      console.log(this.productofUser);
      console.log(this.userManage.ResponseData);

    });
  }

}
