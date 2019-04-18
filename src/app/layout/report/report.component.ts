import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDatepickerInputEvent } from "@angular/material";
import { ReportDataComponent } from 'src/app/report-data/report-data.component';
import { Router } from '@angular/router';
import { ApiProvider } from 'src/app/shared/services/api';
import { WeDataProvider } from 'src/app/shared/we-data-provider';
import { ConfigApi } from 'src/app/shared/services/config';
import { UserDetails } from 'src/app/model/response/user_detail';
import { GetHistory } from 'src/app/model/response/get-history';
import { MAT_DIALOG_DATA } from '@angular/material'
import * as moment from 'moment';
import { UtilProvider } from 'src/app/shared/util';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reportType: string;
  dateFrom: string;
  dateTo: string;
  dateFromData: any;
  dateToData: any;
  view: string;
  userDetail: UserDetails;
  title: string;
  getHistory: GetHistory;
  result: any;
  isSearchStock: boolean = false;
  isSearchSale: boolean = false;
  totalAmount:string;
  constructor(
    private dialog: MatDialog,
    public router: Router,
    public api: ApiProvider,
    public weProvider: WeDataProvider,
    public util: UtilProvider) { }

  ngOnInit() {
    this.userDetail = this.weProvider.GetUserDetail();
    this.dateFromData = new Date();
    this.dateToData = new Date();
    this.reportType = '1';
    this.view = '1';
  }
  ReportTypeSelect(value) {
    console.log(value);
  }
  OnCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    this.dialog.open(ReportDataComponent);
  }
  Print(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    this.dialog.open(ReportDataComponent,{
      data:this.result
    });
  }
  Search() {
    console.log(this.dateFromData + "," + this.dateToData);
    var dateFrom = moment(this.dateFromData).format("MMDDYYYY");
    var dateTo = moment(this.dateToData).format("MMDDYYYY");
    if (this.dateFrom != 'undefined' && this.dateTo != 'undefined') {
      console.log("...asd..")

      if (this.reportType == '1') {
        this.isSearchSale = true;
        this.isSearchStock = false;
      } else {
        this.isSearchSale = false;
        this.isSearchStock = true;

      }
      this.title = this.reportType == "1" ? "Daily Sale Report" : "Daily Stock Report"
      let data = {
        username: this.userDetail.ResponseData.username,
        dateFrom: dateFrom,
        dateTo: dateTo,
        reportType: this.reportType
      }

      this.api.SendRequestApi(ConfigApi.Report_url, data).then((res: any) => {
        this.result = res;
        if (this.reportType == "2") {
          for (let item of this.result.ResponseData.result) {
            item.totalAmount = Number.parseFloat(item.quantityItem) * Number.parseFloat(item.itemPrice);
          }
        }else{
          var itemData= 0;
          for(let item of this.result.ResponseData.data){
            itemData += item.grandTotal;
          }

          this.totalAmount = itemData.toString();
        }

      });


    } else {
      console.log(".....")
    }

  }

  onDate(event): void {
    console.log(event);
  }
  Reset() {
    this.dateFromData = new Date();
    this.dateToData = new Date();
    this.reportType = '1';
    this.view = '1';
    this.isSearchStock = false;
    this.isSearchSale = false;
  }
  ViewSelect() {

  }
}
