import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, MatTabsModule,MatInputModule  } from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,ReportRoutingModule,FormsModule,MatDatepickerModule,MatFormFieldModule,MatButtonModule,MatCardModule,MatIconModule,MatInputModule ,MatTabsModule,MatMomentDateModule
  ]
})
export class ReportModule { }
