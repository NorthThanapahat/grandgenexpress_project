import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-orderdetail',
  templateUrl: './show-orderdetail.component.html',
  styleUrls: ['./show-orderdetail.component.scss']
})
export class ShowOrderdetailComponent implements OnInit {
  
  order:any;
  constructor(public dialogRef: MatDialogRef<ShowOrderdetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }
  Close() {
    this.dialogRef.close("close");
  }
}
