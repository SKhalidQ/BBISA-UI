import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-add-form',
  templateUrl: './order-add-form.component.html',
  styleUrls: ['./order-add-form.component.css']
})
export class OrderAddFormComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.open('Product Added Successfully', 'Undo', {duration: 3000});
  }
  
  ngOnInit() {
  }

}

