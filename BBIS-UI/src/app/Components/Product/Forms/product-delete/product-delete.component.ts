import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})

export class ProductDeleteComponent implements OnInit {

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Products/EliminateProduct';

  constructor(private http:HttpClient, private _snackBar: MatSnackBar, private productService: ProductService) { 
  }
  
  onSubmit(data) {
    const httpOptions = {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }), body: data['productID']
    };

    this.http.delete(this.defaultURL, httpOptions)
    .subscribe((result)=>{
      this._snackBar.open(result['value'], "Dismiss", {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
      this.productService.redoGet.next();
    },
    (error) =>{
      
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
