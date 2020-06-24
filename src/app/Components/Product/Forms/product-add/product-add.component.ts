import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  checkedA = false;
  checkedR = false;

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Products/AddProduct';

  constructor(private http:HttpClient, private _snackBar: MatSnackBar, private productService: ProductService) { }

  myControl = new FormControl();
  options: string[] = ['Bottle', 'Can', 'Keg', 'Plastic'];
  filteredOptions: Observable<string[]>;

  onSubmit(data) {

    this.http.post(this.defaultURL, data)
    .subscribe((result)=>{

      this._snackBar.open(result['value'].value, "Dismiss", {
        duration: 6000,
        panelClass: ['success-snackbar']
      });

      this.productService.redoGet.next();
    },
    error =>{

      var message = error.error['value'];

      if (error.status == 400){
        message = "Internal server error";
      }
      
      this._snackBar.open(message, "Dismiss", {
        duration: 6000,
        panelClass: ['fail-snackbar']
      });

    })
  } 

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
