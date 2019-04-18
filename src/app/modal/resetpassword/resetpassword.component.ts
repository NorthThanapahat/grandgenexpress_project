import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiProvider } from 'src/app/shared/services/api';
import { ConfigApi } from 'src/app/shared/services/config';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  password: string;
  cPassword: string;
  isError: boolean = false;
  constructor(public dialogRef: MatDialogRef<ResetpasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiProvider) { }

  ngOnInit() {
  }
  Close() {
    this.dialogRef.close("close");
  }
  Submit() {
    console.log(this.password);
    if (this.password == this.cPassword) {
      let data = {
        username: this.data.username,
        password: this.password
      }
      this.api.SendRequestApi(ConfigApi.ResetPassword_url, data).then((res: any) => {
        if (res.ResponseCode == 'Success') {
          this.dialogRef.close('close');
        }
      });

    } else {
      this.isError = true;
    }

  }
}
