import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.scss']
})
export class ReportDataComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReportDataComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log(data);
    data.showdate = moment(data.date,'DD/MM/YYYY HH:mm:ss').format('DD MMM YYYY HH:mm:ss');
    for(let orderItem of data.order){
      orderItem.total = (Number.parseFloat(orderItem.itemPrice) * orderItem.quantity).toString();
    }
  }

  ngOnInit() {
    
  }
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(()=>{
      window.print();

    },1000)
    
  }
  Close(){
    this.dialogRef.close();
  }

}
