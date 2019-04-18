import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeDataProvider } from 'src/app/shared/we-data-provider';
import { UserDetails } from 'src/app/model/response/user_detail';
import { ApiProvider } from 'src/app/shared/services/api';
import { ConfigApi } from 'src/app/shared/services/config';
import { UserManageMent, UserData } from 'src/app/model/response/user_manage';
import { ProductData } from 'src/app/model/response/product';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  userDetail : UserDetails;
  company:string;
  itemCode:string;
  itemStatus:string;
  itemName:string;
  itemPrice:string;
  userRef:string;
  userManage: UserManageMent;
  productofUser:Array<UserData> = [];
  title:string;
  private sub: any;
  product:ProductData;
  quantity:string;
  type:string;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public weProvider:WeDataProvider,
    public api:ApiProvider ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(param =>{
      this.type = param.type;
      if(param.product != undefined){
        this.product = JSON.parse(param.product);
      }
      console.log("type ====> ",this.type);
      console.log("type ====> ",this.product);
      if(this.product != undefined){
        this.itemCode = this.product.itemCode;
        this.itemName = this.product.itemName;
        this.itemPrice = this.product.itemPrice;
        this.userRef = this.product.productInUser;
      }
      console.log("type ====> ",param);
      if(this.type == "new"){
        this.title = "Create New Product";
      }else if(this.type == "edit"){
        this.title = "Edit Product";
      }
    });

    
    console.log(this.weProvider.GetUserDetail());
    this.userDetail = this.weProvider.GetUserDetail();
    this.company = this.userDetail.ResponseData.username;
    let data = {
      "username": this.userDetail.ResponseData.username
    }
    this.GetUserManageMent(data);
    this.itemStatus = 'active';

  }
  GetUserManageMent(data) {
    this.api.UserManageMent(data).then(async (result: any) => {
      this.userManage = <UserManageMent> result;
      for(let item of this.userManage.ResponseData){
        if(item.userRole == 'shop'){
          this.productofUser.push(item);
        }
      }
      console.log(this.productofUser);
      console.log(this.userManage.ResponseData);

      console.log(this.userRef);

    });
  }
  back(){
    this.router.navigate(['/product']);
  }
  productOfUser(value){
    this.userRef = value;
    console.log(this.userRef);
  }

  ItemStatusOnChange(value){
    this.itemStatus = value;
    console.log(this.itemStatus);
  }
  save(){
    if(this.type == 'new'){
      if(this.itemCode == '' || this.itemStatus == '' || this.itemName == '' || this.itemPrice == ''){
      
      }
      let data = {
        username:this.userDetail.ResponseData.username,
        itemCode:this.itemCode,
        itemStatus:this.itemStatus,
        itemName:this.itemName,
        itemPrice:this.itemPrice,
        userRef:this.userRef,
        quantity:this.quantity
      }
      this.api.SendRequestApi(ConfigApi.createProduct_url,data).then(res =>{
        this.router.navigate(['/product']);
        console.log(res);
      },(err)=>{
  
      });
    }else if(this.type == 'edit'){
      let data = {
        username:this.userDetail.ResponseData.username,
        itemCode:this.itemCode,
        itemStatus:this.itemStatus,
        itemName:this.itemName,
        itemPrice:this.itemPrice,
        userRef:this.userRef,
        productID:this.product.productId
      }
      this.api.SendRequestApi(ConfigApi.editProduct_url,data).then(res =>{
        this.router.navigate(['/product']);
        console.log(res);
      },(err)=>{
  
      });


    }
   
  }
}
