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
import * as _ from 'lodash';
import { strict } from 'assert';
import { UserManageMent } from 'src/app/model/response/user_manage';

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
  summaryReport: any;
  isSearchStock: boolean = false;
  isSearchSale: boolean = false;
  shopData: Array<any>;
  totalAmount: string;
  resultFilter: Array<any>;
  shopSelect: string;
  constructor(
    private dialog: MatDialog,
    public router: Router,
    public api: ApiProvider,
    public weProvider: WeDataProvider,
    public util: UtilProvider) { }

  ngOnInit() {
    this.shopData = [];
    this.resultFilter = [];
    this.summaryReport = {};
    this.userDetail = this.weProvider.GetUserDetail();
    this.dateFromData = new Date();
    this.dateToData = new Date();
    this.reportType = '1';
    this.view = '1';
    console.log(this.userDetail);
    let data = {
      "username": this.userDetail.ResponseData.username
    }
    this.GetUserManageMent(data);
  }
  GetUserManageMent(data) {
    this.shopData = [];
    this.shopSelect = 'All';
    this.api.UserManageMent(data).then(async (result: any) => {
      this.shopData.push({ username: 'All' });
      for (let item of result.ResponseData) {
        if (item.userRole == 'shop') {
          this.shopData.push(item);
        }

      }


    });
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
 
  ShowModal(item) {
    console.log('showModal')

    this.dialog.open(ReportDataComponent, {
      width: "100%",
      height: "100%",
      panelClass: "modal-popup",
      data: item
    });
  }
  Search() {
    this.summaryReport = {};
    this.resultFilter = [];
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
        console.log(this.result);
        if (this.reportType == "2") {
          this.resultFilter = res.ResponseData.result;

          for (let item of this.result.ResponseData.result) {

            console.log(Number.parseFloat(item.quantityItem));
            if (!isNaN(Number.parseFloat(item.quantityItem))) {
              item.totalAmount = Number.parseFloat(item.quantityItem) * Number.parseFloat(item.itemPrice);
            } else {
              item.totalAmount = '';
              item.quantityItem = '';
            }
          }
        } else {

          this.resultFilter = res.ResponseData.data;
          if (this.shopSelect != 'All') {
            console.log(this.shopSelect)
            this.resultFilter = this.resultFilter.filter((item: any) => {
              return item.customerOfUser.trim().indexOf(this.shopSelect.trim()) > -1;
            });
          }

          if (this.result.ResponseData.data.length > 0) {
            this.GroupSummary();
          }


          var itemData = 0;
          for (let item of this.result.ResponseData.data) {
            itemData = item.grandTotal;
          }

          this.totalAmount = itemData.toString();
        }

      });


    } else {
      console.log(".....")
    }

  }
  GroupSummary() {
    this.summaryReport = _(this.resultFilter).groupBy('user')
      .map((v, user) => ({
        user,
        data: v
      })).value();

    for (let item of this.summaryReport) {
      item.totalAmount = 0;
      for (let itemDetail of item.data) {
        item.totalAmount += Number.parseFloat(itemDetail.grandTotal);
      }
    }
    console.log(this.summaryReport)
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
  ViewSelect(value) {
    console.log(value)
    if (value == 'All') {
      if (this.reportType == '1') {
        this.resultFilter = this.result.ResponseData.data;

      } else if (this.reportType == '2') {
        this.resultFilter = this.result.ResponseData.result;
      }
    }
    else {
      if (this.reportType == '1') {
        this.resultFilter = this.result.ResponseData.data;

      } else if (this.reportType == '2') {
        this.resultFilter = this.result.ResponseData.result;
      }
      this.resultFilter = this.resultFilter.filter((item: any) => {
        return item.customerOfUser.trim().indexOf(this.shopSelect.trim()) > -1;
      });

    }
    this.GroupSummary();

  }
}

