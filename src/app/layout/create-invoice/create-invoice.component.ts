import { Component, OnInit } from '@angular/core';
import { WeDataProvider } from 'src/app/shared/we-data-provider';
import { UserDetails } from 'src/app/model/response/user_detail';
import { ApiProvider } from 'src/app/shared/services/api';
import { ConfigApi } from 'src/app/shared/services/config';
import { SearchCustomer } from 'src/app/model/response/searchCustomer';
import * as moment from 'moment';
import { UserManageMent, UserData } from 'src/app/model/response/user_manage';
import { Product } from 'src/app/model/response/product';
import { OrderSave, OrderProductData } from 'src/app/model/request/orderSave';
import { OrderDetailSave, OrderDetail, Payment } from 'src/app/model/request/orderDetailSave';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';

import { ReportDataComponent } from 'src/app/report-data/report-data.component';
import { UtilProvider } from 'src/app/shared/util';
import { AlertMessageComponent } from 'src/app/alert-message/alert-message.component';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  mobile: string;
  userDetail: UserDetails;
  isCustomerEmpty: boolean = false;
  isCustomerInfoEmpty: boolean = false;
  customer: SearchCustomer;
  customerSave: SearchCustomer;
  date: string;
  userManage: UserManageMent;
  productofUser: Array<UserData> = [];
  isUserChange: false;
  product: Product;
  totalPrice: number = 0;
  addCharges: number;
  priceList: Array<String> = [];
  userRef: string;
  totalQuantity: number = 0;
  Total: number = 0;
  discount: number;
  isCOD = false;
  cod: string;
  codCost: number;
  paymentType: string;
  image: any;
  customerAddress: string;
  customerEmail: string;
  customerMobile: string;
  customerName: string;
  customerRefNo: string;
  amount: string;
  different: string;
  shipping: number;
  productSave: OrderSave;
  productDataSave: OrderProductData;
  additionalCost: number;
  orderNoSave: string;
  error: boolean = false;
  Remark: string = '';
  data: any;
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
  orderDetail: OrderDetailSave = new OrderDetailSave();
  constructor(
    private dialog: MatDialog,
    public router: Router,
    public api: ApiProvider,
    private route: ActivatedRoute,
    public weProvider: WeDataProvider,
    public util: UtilProvider) { }

  ngOnInit() {
    
    this.SetData();
    this.addCharges = 0;
    this.codCost = 0;
    this.Total = 0;
    this.discount = 0;
    this.additionalCost = 0;
    this.shipping = 0
    this.date = moment().format('DD/MM/YYYY');
    console.log(this.date)
    this.userDetail = this.weProvider.GetUserDetail();
    this.cod = "yes";
    this.isCOD = true;
    this.paymentType = "Please Select";
    this.productSave = new OrderSave();
    if (this.userDetail.ResponseData.userRole == "shop") {
      let data = {
        username: this.userDetail.ResponseData.username
      }
      this.GetProductInquiry(data);
    } else if (this.userDetail.ResponseData.userRole == "cashier") {
      let data = {
        username: this.userDetail.ResponseData.userRef
      }
      this.GetProductInquiry(data);
    }
  }
  CODChange(value) {
    if (value == "yes") {
      this.isCOD = true;
      this.SUMTotal();
    } else {
      this.isCOD = false;

      this.SUMTotal();
    }
  }
  processFile(value) {
    this.readThis(value.target);
  }
  Shipping(value) {
    if (this.shipping == null)
      this.shipping = 0;
    this.Total = this.SUMTotal();
  }
  AdditionalCost(value) {
    if (this.additionalCost == null)
      this.additionalCost = 0;
    this.Total = this.SUMTotal();
  }

  SUMTotal() {
    if (this.isCOD)
      this.codCost = (this.totalPrice - this.discount) * 0.03;
    else
      this.codCost = 0;
    let total = this.totalPrice - this.discount + this.addCharges - this.codCost - this.additionalCost - this.shipping;
    this.different = "-" + total.toString();

    return total;
  }
  SetData() {
    this.date = ''
    this.customerName = ''
    this.customerAddress = ''
    this.customerMobile = ''
    this.totalQuantity = 0;
    this.paymentType = 'Please Select'
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      console.log(myReader.result);
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  async next() {
    this.customerMobile = this.mobile;
    console.log(this.mobile)
    if (this.mobile == "" || this.mobile == undefined) {
      this.error = true;
    } else {
      let data = {
        username: this.userDetail.ResponseData.username,
        tel: this.mobile
      }
      await this.GetSearchCustomer(data);
    }
  }
  async GetSearchCustomer(data) {
    this.api.SendRequestApi(ConfigApi.SearchCustomer_url, data).then((res: any) => {
      console.log("GetSearchCustomer ===>", res);
      this.customer = <SearchCustomer>res;
      if (this.customer.ResponseCode == "Success") {
        this.isCustomerInfoEmpty = true;
        if (this.userDetail.ResponseData.userRole == 'admin') {
          let data = {
            "username": this.userDetail.ResponseData.username
          }
          this.GetUserManageMent(data);
        }


        if (this.customer.ResponseData.length == 0) {
          this.isCustomerEmpty = true;
        } else {

          if (this.customer.ResponseData.length > 0) {
            this.customerAddress = this.customer.ResponseData[0].customerAddress;
            this.customerEmail = this.customer.ResponseData[0].customerEmail;
            this.customerName = this.customer.ResponseData[0].customerName;
            this.customerMobile = this.customer.ResponseData[0].customerTel;
          }

        }
      }
    });
    console.log(this.isCustomerInfoEmpty);
  }
  GetUserManageMent(data) {
    this.api.UserManageMent(data).then(async (result: any) => {
      this.userManage = <UserManageMent>result;
      for (let item of this.userManage.ResponseData) {
        if (item.userRole == 'shop') {
          this.productofUser.push(item);
        }
      }
      console.log("this.productofUser:", this.productofUser);

      this.userRef = this.productofUser[0].username;
      this.ProductOfUser(this.userRef);
      console.log(this.userManage.ResponseData);
    });
  }

  ProductOfUser(user) {
    let data = {
      username: user
    }
    this.GetProductInquiry(data);
  }
  GetProductInquiry(data) {
    this.priceList = [];
    this.api.ProductInquiry(data).then((res: any) => {
      console.log(res)
      this.product = <Product>res;
      if (this.product.ResponseData.length == 0) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "70%";
        dialogConfig.maxWidth = "70%";
        dialogConfig.panelClass = "popup-modal"
        if (this.userDetail.ResponseData.userRole != 'admin') {
          dialogConfig.data = { title: "Error", text: "No Product Data , Please Contact admin" };
          const dialogRef = this.dialog.open(AlertMessageComponent, dialogConfig);

          dialogRef.afterClosed().subscribe(result => {
            if (this.userDetail.ResponseData.userRole == 'admin') {
              this.router.navigate(['/create-product'], { queryParams: { type: "new" } });
            } else {
              this.router.navigate(['/dashboard']);
  
            }
            console.log('The dialog was closed');
          });
        } else {
          this.err.noProduct = true;
          this.err.isErr = true;
        }

      
      } else {
        this.err.noProduct = false;
        this.err.isErr = false;
        for (let item of this.product.ResponseData) {
          item.quantity = "0";
        }
      }
    }, (err) => {

    });
  }
  QuantityOnChange(value, itemPrice, index) {
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.product.ResponseData[index].price = (Number.parseFloat(itemPrice) * value).toString();
    this.product.ResponseData[index].quantity = value.toString();
    console.log("value=>", value);
    console.log("product=>", this.product);
    for (let item of this.product.ResponseData) {

      if (item.price != undefined) {
        console.log(item.price)

        this.totalPrice += Number.parseFloat(item.price);

      }
      if (item.quantity == undefined || item.quantity == '' || item.quantity == null) {
        item.quantity = '0';
      }
      this.totalQuantity += Number.parseFloat(item.quantity);

    }
    console.log(this.discount);
    console.log(this.addCharges);
    if (this.discount != undefined && this.addCharges != undefined) {
      this.Total = this.SUMTotal();

      console.log('this.discount != undefined && this.addCharges != undefined');
    } else if (this.discount != undefined) {
      console.log('(this.discount != undefined');

      this.Total = this.SUMTotal();
    } else if (this.addCharges != undefined) {
      console.log('this.addCharges != undefined');
      this.Total = this.SUMTotal();
    } else {
      this.Total = this.SUMTotal();
    }


    this.different = "-" + this.Total.toString();
    console.log(this.totalQuantity)
    console.log(this.totalPrice)
    if (this.totalQuantity != 0) {
      this.err.quantity = false;
    }
  }
  Validate() {
    return true;
  }

  save() {
    if (this.date == '') {
      this.err.date = true;
      this.err.isErr = true;
    }
    if (this.customerName == '') {
      this.err.customerName = true;
      this.err.isErr = true;
    }
    if (this.customerAddress == '') {
      this.err.customerAddress = true;
      this.err.isErr = true;
    }
    if (this.customerMobile == '') {
      this.err.customerMobileNo = true;
      this.err.isErr = true;
    }
    if (this.totalQuantity == 0) {
      this.err.quantity = true;
      this.err.isErr = true;
    }
    if (this.paymentType == 'Please Select') {
      this.err.paymentType = true;
      this.err.isErr = true;
    }
    if (this.err.noProduct) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      dialogConfig.maxWidth = "70%";
      dialogConfig.panelClass = "popup-modal"
      dialogConfig.data = { title: "Error", text: "Please add product before creating invoice." };

      const dialogRef = this.dialog.open(AlertMessageComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (this.userDetail.ResponseData.userRole == 'admin') {
          this.router.navigate(['/create-product'], { queryParams: { type: "new" } });
        } else {
          this.router.navigate(['/dashboard']);
        }
        console.log('The dialog was closed');
      });
    }
    console.log(this.err)
    if (!this.err.isErr) {


      console.log(this.addCharges);
      if (this.isCustomerEmpty) {
        if (this.userDetail.ResponseData.userRole == "admin") {
          var username = this.userRef;
        } else if (this.userDetail.ResponseData.userRole == "shop") {
          var username = this.userDetail.ResponseData.username;
        } else if (this.userDetail.ResponseData.userRole == "cashier") {
          var username = this.userDetail.ResponseData.userRef;
        }
        let data = {
          customerName: this.customerName,
          customerAddress: this.customerAddress,
          customerEmail: this.customerEmail,
          customerMobile: this.customerMobile,
          customerOfUser: username
        }
        console.log("req createcustomer ==>", data);
        this.api.SendRequestApi(ConfigApi.CreateCustomer_url, data).then((res: any) => {
          this.customerSave = <SearchCustomer>res;
          if (this.customerSave.ResponseCode == "Success") {
            this.saveMethod(username, this.customerSave.ResponseData[0].customerId);
          }
        });
      } else {
        let usernameSave = '';
        if (this.userDetail.ResponseData.userRole == "admin") {
          usernameSave = this.userRef;
        } else if (this.userDetail.ResponseData.userRole == "shop") {
          usernameSave = this.userDetail.ResponseData.username;
        } else if (this.userDetail.ResponseData.userRole == "cashier") {
          usernameSave = this.userDetail.ResponseData.userRef;
        }
        console.log("usernameSave:", usernameSave);

        this.saveMethod(usernameSave, this.customer.ResponseData[0].customerId);
      }
    }
  }
   ValidateSave(){
    if (this.date != '') {
      this.err.date = false;
      this.err.isErr = false;
    }
    if (this.customerName != '') {
      this.err.customerName = false;
      this.err.isErr = false;
    }
    if (this.customerAddress != '') {
      this.err.customerAddress = false;
      this.err.isErr = false;
    }
    if (this.customerMobile != '') {
      this.err.customerMobileNo = false;
      this.err.isErr = false;
    }
    if (this.totalQuantity != 0) {
      this.err.quantity = false;
      this.err.isErr = false;
    }
    if (this.paymentType != 'Please Select') {
      this.err.paymentType = false;
      this.err.isErr = false;
    }
    
  }
  private saveMethod(username: string, customerId: string) {
    let orderSave = [];

    for (let i in this.product.ResponseData) {
      if (Number.parseInt(this.product.ResponseData[i].quantity) > 0) {
        console.log(this.product)
        this.productDataSave = new OrderProductData();
        this.productDataSave.productId = this.product.ResponseData[i].productId;
        this.productDataSave.quantity = this.product.ResponseData[i].quantity;

        orderSave.push(this.productDataSave);
      }
    }
    let ordersaveData = {
      username: username,
      product: orderSave
    }
    console.log("this.productDataSave : ", orderSave);
    var cod = this.isCOD ? '1' : '0';
    this.api.SendRequestApi(ConfigApi.Order_url, ordersaveData).then((res: any) => {
      if (res.ResponseCode == "Success") {
        this.orderNoSave = res.ResponseMessage.orderNo;
        this.orderDetail.username = username;
        this.orderDetail.createBy = this.userDetail.ResponseData.username;
        this.orderDetail.cod = cod;
        this.orderDetail.addCharge = this.addCharges + "";
        this.orderDetail.discount = this.discount + "";
        this.orderDetail.additionalCost = this.additionalCost + "";
        this.orderDetail.shippingFee = this.shipping + "";
        this.orderDetail.codCost = this.codCost + "";
        this.orderDetail.customerId = customerId;
        this.orderDetail.customerRefNo = this.customerRefNo;
        this.orderDetail.orderDetail = new OrderDetail();
        this.orderDetail.orderDetail.addCharge = this.addCharges + "";
        this.orderDetail.orderDetail.discount = this.discount + "";
        this.orderDetail.orderDetail.grandTotal = this.Total.toString();
        this.orderDetail.orderDetail.totalCharge = this.totalPrice.toString();
        this.orderDetail.orderDetail.totalQuantity = this.totalQuantity.toString();
        this.orderDetail.orderNo = this.orderNoSave;
        this.orderDetail.payment = new Payment();
        this.orderDetail.payment.amount = this.amount.toString();
        this.orderDetail.payment.paymentImage = this.image;
        this.orderDetail.payment.paymentType = this.paymentType;
        this.api.SendRequestApi(ConfigApi.OrderDetail_url, this.orderDetail).then((res: any) => {
          if (res.ResponseCode == "Success") {
            this.router.navigate(['/inquiry-invoice']);
          }
        });
      }
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  Amount(value) {
    this.different = (Number.parseFloat(value) - this.Total).toString();
  }
  Charges(value) {
    if (this.addCharges == null) {
      this.addCharges = 0;
    }
    this.Total = this.SUMTotal();
    this.different = "-" + this.Total.toString();

  }
  Discount(value) {
    console.log(this.discount)
    if (this.discount == null) {
      this.discount = 0;
    }
    this.Total = this.SUMTotal();
    this.different = "-" + this.Total.toString();

  }

}
