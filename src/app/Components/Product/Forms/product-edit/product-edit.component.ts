import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  checkedA = false;
  checkedR = false;

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Products/UpdateInfo';

  constructor(private http:HttpClient, private _snackBar: MatSnackBar, private productService: ProductService) { }

  onSubmit(data) {

    if (data["stockAmount"] == "0"){
      data["stockAmount"] = 0;
    } 
    else if (data["stockAmount"] == "" || data["stockAmount"] == null){
      data["stockAmount"] = -1;
    }

    if (data["sellPrice"] == "0"){
      data["sellPrice"] = 0;
    } 
    else if (data["sellPrice"] == "" || data["sellPrice"] == null){
      data["sellPrice"] = -1;
    }

    if (data["discount"] == "0"){
      data["discount"] = 0;
    } 
    else if (data["discount"] == "" || data["discount"] == null){
      data["discount"] = -1;
    }

    this.http.put(this.defaultURL, data)
    .subscribe((result)=>{

      this._snackBar.open(result['value'], "Dismiss", {
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

  ngOnInit(): void {
  }
}
