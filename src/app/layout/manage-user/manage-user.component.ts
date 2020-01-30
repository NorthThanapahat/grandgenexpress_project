import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ApiProvider } from 'src/app/shared/services/api';
import { UserDetails } from 'src/app/model/response/user_detail';
import { UserManageMent } from 'src/app/model/response/user_manage';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetpasswordComponent } from 'src/app/modal/resetpassword/resetpassword.component';
import { ConfirmModalComponent } from 'src/app/modal/confirm-modal/confirm-modal.component';
import { ConfigApi } from 'src/app/shared/services/config';
import { UtilProvider } from 'src/app/shared/util';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  animations: [routerTransition()]
})
export class ManageUserComponent implements OnInit {
  userDetail: UserDetails;
  userManage: UserManageMent;


  constructor(public api: ApiProvider
    , public dialogCtrl: MatDialog
    , public router: Router,
    public util: UtilProvider,
    private dialog: MatDialog) {

    this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
    console.log(this.userDetail);
    let data = {
      "username": this.userDetail.ResponseData.username
    }
    this.GetUserManageMent(data);
  }

  ngOnInit() {

  }
  Delete(username) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.panelClass = "popup-modal"
    dialogConfig.data = { title: "Delete", content: "Are you sure for Delete : " + username, username: username };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result == "OK") {
        let data = {
          username: username
        }
        this.api.SendRequestApi(ConfigApi.DeleteUser_url, data).then((res: any) => {
          if (res.ResponseCode == "Success") {
            window.location.reload();
          } else {
            this.util.AlertMessage("Delete", res.ResponseMessage);
          }
        });
      }
    });

  }
  ResetPassword(username) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "70%";
    dialogConfig.panelClass = "popup-modal"
    dialogConfig.data = { username: username };

    const dialogRef = this.dialog.open(ResetpasswordComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    })
  }
  CreateUser() {
    this.router.navigate(['/new-user']);
  }
  GetUserManageMent(data) {
    this.api.UserManageMent(data).then(async (result: any) => {
      this.userManage = <UserManageMent>result;
      console.log(this.userManage.ResponseData);

    });
  }
}
