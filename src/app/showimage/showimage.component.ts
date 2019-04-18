import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertMessageComponent } from '../alert-message/alert-message.component';

@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.component.html',
  styleUrls: ['./showimage.component.scss']
})
export class ShowimageComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ShowimageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
