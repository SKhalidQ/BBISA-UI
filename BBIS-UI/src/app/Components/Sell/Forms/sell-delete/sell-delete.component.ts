import { ProductService } from './../../../../Services/Product/product.service';
import { SellService } from './../../../../Services/Sell/sell.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sell-delete',
  templateUrl: './sell-delete.component.html',
  styleUrls: ['./sell-delete.component.css']
})
export class SellDeleteComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private _snackBar: MatSnackBar,
    private sellService: SellService,
    private productService: ProductService
  ) { }

  onSubmit(data) {

    const httpOptions = {
      headers: new HttpHeaders ({ 'Content-Type': 'application/json' }), body: data['orderID']
    };

    this.http.delete('https://bbisa.azurewebsites.net/api/Sell/EliminateSell', httpOptions)
    .subscribe((result)=>{

      this._snackBar.open(result['value'], "Dismiss", {
        duration: 2000,
        panelClass: ['success-snackbar']
      });

      this.sellService.redoGet.next();
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
