import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-edit-form',
  templateUrl: './order-edit-form.component.html',
  styleUrls: ['./order-edit-form.component.css']
})
export class OrderEditFormComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {}
  
  today = new Date();
  date = this.today.getDate() + "/" + (this.today.getMonth()) + "/" + this.today.getFullYear();
  startDate = this.date;  

  openSnackBar() {
    this._snackBar.open('Product Edited Successfully', 'Undo', {duration: 3000});
  }

  ngOnInit() {
  }

}
