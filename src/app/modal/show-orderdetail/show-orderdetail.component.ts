import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ReportDataComponent } from 'src/app/report-data/report-data.component';

@Component({
  selector: 'app-show-orderdetail',
  templateUrl: './show-orderdetail.component.html',
  styleUrls: ['./show-orderdetail.component.scss']
})
export class ShowOrderdetailComponent implements OnInit {
  
  order:any;
  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<ShowOrderdetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }
  Close() {
    this.dialogRef.close("close");
  }
  Print() {
    this.dialogRef.close("close");
    this.dialog.open(ReportDataComponent, {
      width: "100%",
      height: "100%",
      panelClass: "modal-popup",
      data: this.data.value
    });
   
  }
}
