import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductComponent } from './manage-product.component';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductRoutingModule } from './manage-product-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [ManageProductComponent,DeleteDialogComponent],
  entryComponents:[DeleteDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ManageProductRoutingModule,
    MatDialogModule,
    PageHeaderModule
  ]
})
export class ManageProductModule { }
