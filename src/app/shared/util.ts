import { Injectable } from '@angular/core';
import { UserDetails } from '../model/response/user_detail';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AlertMessageComponent } from '../alert-message/alert-message.component';


@Injectable()
export class UtilProvider {
  constructor(public http: HttpClient,
    private dialog: MatDialog) {

  }

  ChangeFormatDate(date, format1, format2): any {
    return moment(date, format1).format(format2);
  }

  AlertMessage(title: string, content: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "70%";
    dialogConfig.panelClass = "popup-modal"
    dialogConfig.data = { title: title, text: content};

    this.dialog.open(AlertMessageComponent, dialogConfig);
  }
}