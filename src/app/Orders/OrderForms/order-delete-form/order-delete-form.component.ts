import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-delete-form',
  templateUrl: './order-delete-form.component.html',
  styleUrls: ['./order-delete-form.component.css']
})
export class OrderDeleteFormComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {}

  today = new Date();
  date = this.today.getDate() + "/" + (this.today.getMonth()) + "/" + this.today.getFullYear();
  startDate = this.date; 

  openSnackBar() {
    this._snackBar.open('Product Deleted Successfully', 'Undo', {duration: 3000});
  }

  ngOnInit() {
  }

}
