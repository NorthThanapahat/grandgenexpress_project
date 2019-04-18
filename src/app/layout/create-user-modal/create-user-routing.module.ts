import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserModalComponent } from './create-user-modal.component';

const routes: Routes = [
  {
      path: '', component: CreateUserModalComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUserRoutingModule { }
