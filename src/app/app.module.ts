import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ApiProvider } from './shared/services/api';
import { FormsModule } from '@angular/forms';
import { ManageUserComponent } from './layout/manage-user/manage-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WeDataProvider } from './shared/we-data-provider';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { ToastrAlertDirective } from './shared/toastr-alert/toastr-alert';
import {  UtilProvider } from './shared/util';
import { ReportDataComponent } from './report-data/report-data.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { ShowimageComponent } from './showimage/showimage.component';
import { ResetpasswordComponent } from './modal/resetpassword/resetpassword.component';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
import { ShowOrderdetailComponent } from './modal/show-orderdetail/show-orderdetail.component';
import { EditInvoiceComponent } from './modal/edit-invoice/edit-invoice.component';
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        MatDialogModule,
        MatDatepickerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
      
    ],
    declarations: [AppComponent, ReportDataComponent, AlertMessageComponent, ShowimageComponent, ResetpasswordComponent, ConfirmModalComponent, ShowOrderdetailComponent, EditInvoiceComponent],
    providers: [AuthGuard, ApiProvider,WeDataProvider,UtilProvider],
    bootstrap: [AppComponent],
    entryComponents:[ReportDataComponent,AlertMessageComponent,ShowimageComponent,ResetpasswordComponent,ConfirmModalComponent,ShowOrderdetailComponent,EditInvoiceComponent],
    exports:[
        MatDialogModule
    ]
})
export class AppModule {}
