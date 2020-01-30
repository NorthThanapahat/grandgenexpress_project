import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiProvider } from 'src/app/shared/services/api';
import { UserDetails } from 'src/app/model/response/user_detail';
import { ConfigApi } from 'src/app/shared/services/config';
import { UserManageMent, UserData } from 'src/app/model/response/user_manage';
import { UtilProvider } from 'src/app/shared/util';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPass: string = '';
  email: string = '';
  firstname: string = '';
  lastname: string = '';
  userDetail: UserDetails;
  userRole: string;
  isCashier: boolean = false;
  userManage: UserManageMent;
  userRef: Array<UserData> = [];
  userRefSelect: string;
  err = {
    firstname: false,
    username: false,
    password: false
  }
  constructor(public api: ApiProvider, public router: Router, private util: UtilProvider) { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
    this.userRole = "shop";
    if (this.userDetail.ResponseData.userRole == 'admin') {
      let data = {
        "username": this.userDetail.ResponseData.username
      }
      this.GetUserRole(data);
    }

  }
  back() {
    this.router.navigate(['/manage-user']);
  }
  Validate() {

    if (this.password !== this.confirmPass) {
      this.err.password = true;
      return false;
    }
    if (this.username === '' || this.username === null) {
      this.err.username = true;
      return false;
    }
    if (this.firstname === '' || this.firstname === null) {
      this.err.firstname = true;
      return false;

    }
    else
      return true;
  }
  UserRefSelect(value) {
    console.log(value);
  }
  UserRoleChange(value) {
    console.log(value);
    if (value == 'cashier') {
      this.isCashier = true;
    } else {
      this.isCashier = false;
    }
  }

  GetUserRole(data) {
    this.api.SendRequestApi(ConfigApi.userManageMent_url, data).then(async (result: any) => {
      this.userManage = <UserManageMent>result;
      for (let item of this.userManage.ResponseData) {
        if (item.userRole == 'shop') {
          this.userRef.push(item);
        }
      }
      console.log(this.userRef);
      console.log(this.userManage.ResponseData);

      console.log(this.userRef);

    });
  }
  save() {
    if (this.Validate()) {
      let access = '';
      let userRefData = '';
      if (this.userDetail.ResponseData.userRole == 'admin') {
        access = this.userRole;

        if (this.userRole == "shop" || this.userRole == "admin") {
          userRefData = this.userDetail.ResponseData.username;
        } else if (this.userRole == "cashier") {
          userRefData = this.userRefSelect;
        }

      } else if (this.userDetail.ResponseData.userRole == 'shop') {
        access = 'cashier';
        userRefData = this.userDetail.ResponseData.username;
      }
      let data = {
        "username": this.username,
        "password": this.password,
        "firstname": this.firstname,
        "lastname": this.lastname,
        "email": this.email,
        "userRole": access,
        "userRef": userRefData
      }

      this.CreateUser(data);
    } else {
      this.util.AlertMessage("Warning !", "Please fill full on CreateUser Form !!");
    }
  }

  CreateUser(data) {
    this.api.CreateUser(data).then(async (result: any) => {
      if (result.ResponseCode == 'Success') {
        this.router.navigate(['/manage-user']);
      }
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }
}
