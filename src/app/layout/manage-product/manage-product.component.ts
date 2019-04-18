import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiProvider } from 'src/app/shared/services/api';
import { routerTransition } from 'src/app/router.animations';
import { WeDataProvider } from 'src/app/shared/we-data-provider';
import { UserDetails } from 'src/app/model/response/user_detail';
import { Product } from 'src/app/model/response/product';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { ConfigApi } from 'src/app/shared/services/config';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
  animations: [routerTransition()]
})
export class ManageProductComponent implements OnInit {
  sortType:string;
  sortReverse:boolean;
  userDetail:UserDetails;
  product:Product;
  constructor(public router: Router,
    public api: ApiProvider,
    public weProvider:WeDataProvider,
    public dialog:MatDialog) {
    this.sortType = 'itemCode';
    this.sortReverse = false;
   }

  ngOnInit() {
    this.userDetail = this.weProvider.GetUserDetail();
    let data = {
      username:this.userDetail.ResponseData.username
    }
    this.GetProductInquiry(data);
  }
  createNewProduct(){
    this.router.navigate(['/create-product'],{ queryParams: { type: "new"} });
  }

  EditProduct(value){
    console.log(value);
    let product = value;
    this.router.navigate(['/create-product'],{ queryParams: { type: "edit",product:JSON.stringify(product) } });
    console.log(value);
  }

  GetProductInquiry(data){
    this.api.ProductInquiry(data).then((res:any)=>{
      this.product = <Product> res;
      console.log(this.product);
    },(err)=>{

    });
  }

  DeleteProduct(productID){
    // let dialogRef = this.dialog.open(DeleteDialogComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`); // Pizza!
    // });
    let data = {
      productID :productID
    }
    this.api.SendRequestApi(ConfigApi.deleteProduct_url,data).then((res:any)=>{
      this.product = <Product> res;
      console.log(this.product);
      window.location.reload();
    },(err)=>{

    });

  }
}
