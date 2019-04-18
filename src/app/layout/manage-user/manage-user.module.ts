import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { ManageUserComponent } from './manage-user.component';
import { ManageUserRoutingModule } from './manage-user-routing.module';
@NgModule({
  imports: [CommonModule,ManageUserRoutingModule,PageHeaderModule],
  declarations: [ManageUserComponent]

})
export class ManageUserModule {}


