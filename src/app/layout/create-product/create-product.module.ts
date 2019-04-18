import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product.component';
import { CreateProductRoutingModule } from './create-product-routing.module';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,CreateProductRoutingModule,FormsModule,PageHeaderModule
  ]
})
export class CreateProductModule { }
