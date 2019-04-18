import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { WeDataProvider } from 'src/app/shared/we-data-provider';
import { ApiProvider } from 'src/app/shared/services/api';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/model/response/user_detail';
import { ConfigApi } from 'src/app/shared/services/config';
import { GetHistory } from 'src/app/model/response/get-history';
import * as moment from 'moment';
import { UtilProvider } from 'src/app/shared/util';
import { inquiryOrder } from 'src/app/model/response/inquiryOrder';
import { Product } from 'src/app/model/response/product';
import { UserManageMent } from 'src/app/model/response/user_manage';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    userDetail: UserDetails;
    getHistory: GetHistory;
    today:string;
    todayOrder:string;
    monthOrder:string;
    pendingDelivery:string;
    PendingCOD:string;
    todayEarnings:string;
    monthEarnings:string;
    inquiryOrder:inquiryOrder;
    productData : Product;
    userManagement:UserManageMent;
    shopUser = [];
    thisMonth:string;
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };


    constructor(public weProvider: WeDataProvider,
        public api: ApiProvider,
        public router: Router,
        public util : UtilProvider) {

    }

    ngOnInit() {
        this.userDetail = this.weProvider.GetUserDetail();
        this.today = moment().format('DD/MM/YYYY');
        this.thisMonth = moment().format('MM/YYYY');
        var data = {};
        if(this.userDetail.ResponseData.userRole=="admin" || this.userDetail.ResponseData.userRole=="shop"){
            data = {
                username: this.userDetail.ResponseData.username
            }
        }else if(this.userDetail.ResponseData.userRole == "cashier"){
            data = {
                username:this.userDetail.ResponseData.userRef
            }
        }
        
        this.api.SendRequestApi(ConfigApi.GetHistory_url, data).then((res: any) => {
            this.getHistory = <GetHistory>res;
            var earning = 0;
            var order = 0;
            var monthOrder = 0;
            var monthEarnings = 0;
            if(this.getHistory.ResponseCode=="Success"){
                for(let item of this.getHistory.ResponseData){
                    if(this.util.ChangeFormatDate(item.date,"DD/MM/YYYY HH:mm:ss","DD/MM/YYYY") == this.today){
                     earning += Number.parseFloat(item.grandTotal);
                     order++;
                    }
                    if(this.util.ChangeFormatDate(item.date,"DD/MM/YYYY HH:mm:ss","MM/YYYY") == this.thisMonth){
                        monthEarnings += Number.parseFloat(item.grandTotal);
                        monthOrder ++;
                    }
                }
                this.monthOrder = monthOrder.toString();
                this.monthEarnings = monthEarnings.toString();
                this.todayEarnings = earning.toString();
                this.todayOrder = order.toString();
                console.log(this.todayEarnings);
            }
        });
        this.api.SendRequestApi(ConfigApi.InquiryOrder_url,data).then((res:any)=>{
            this.inquiryOrder = <inquiryOrder> res;
            if(this.inquiryOrder.ResponseCode=="Success"){
                var pendingDelivery = 0;
                for(let item of this.inquiryOrder.ResponseData.data){
                    if(item.status =="Waiting for shipment"){
                        pendingDelivery++;
                    }
                }
                this.pendingDelivery = pendingDelivery.toString();
            }
        });

        this.api.SendRequestApi(ConfigApi.userManageMent_url,data).then((res:any)=>{
            this.userManagement = <UserManageMent> res;
            if(this.userManagement.ResponseCode=="Success"){
                for(let item of this.userManagement.ResponseData){
                    if(item.userRole == "shop"){
                        this.shopUser.push(item);
                    }

                }
            }
        });
        console.log("shopUser:",this.shopUser);
        this.api.SendRequestApi(ConfigApi.productInquiry_url,data).then((res:any)=>{
            this.productData = <Product> res;
            if(this.productData.ResponseCode=="Success"){
            }
        });

        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40, 21, 22, 69, 11], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean;
    public lineChartType: string;
    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
