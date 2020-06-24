import { ProductService } from './../../../../Services/Product/product.service';
import { OrderService } from './../../../../Services/Order/order.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.css']
})
export class OrderDeleteComponent implements OnInit {

  constructor(
    private http:HttpClient, 
    private _snackBar: MatSnackBar, 
    private orderService: OrderService,
    private productService: ProductService) { }

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Orders/EliminateOrder';

  onSubmit(data) {

    const httpOptions = {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }), body: data['orderID']
    };

    this.http.delete(this.defaultURL, httpOptions)
    .subscribe((result)=>{

      this._snackBar.open(result['value'], "Dismiss", {
        duration: 6000,
        panelClass: ['success-snackbar']
      });

      this.orderService.redoGet.next();
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
