import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserModalComponent } from './create-user-modal.component';
import { FormsModule } from '@angular/forms';
import { CreateUserRoutingModule } from './create-user-routing.module';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
  declarations: [CreateUserModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    CreateUserRoutingModule,
    PageHeaderModule
  ]
})
export class CreateUserModuleModule { }
