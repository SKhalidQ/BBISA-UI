import { ProductService } from './../../../../Services/Product/product.service';
import { SellService } from './../../../../Services/Sell/sell.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sell-add',
  templateUrl: './sell-add.component.html',
  styleUrls: ['./sell-add.component.css']
})
export class SellAddComponent implements OnInit {

  checkedR = false;

  constructor(
    private http:HttpClient, 
    private _snackBar: MatSnackBar, 
    private sellService: SellService, 
    private productService: ProductService
  ) { }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  totalCost: number;

  private defaultGetURL = 'https://bbisa.azurewebsites.net/api/Sell/GetSubTotalSell?';
  private defaultPostURL = 'https://bbisa.azurewebsites.net/api/Sell/AddSell?ProductID=';

  getSubtotal(data) {

    var url = this.defaultGetURL + 
    "ProductID=" + data['productID'] + 
    "&Quantity=" + data['quantity'] + 
    "&ContainerReturned=" + data['containerReturned'];

    this.http.get(url).subscribe((result) =>{

      this._snackBar.open("Subtotal: £" + result['value'], "Dismiss", {
        duration: 4000,
        panelClass: ['success-snackbar']
      });

      this.totalCost = result['value'];
      url = this.defaultGetURL

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

      url = this.defaultGetURL;

    });
  }

  onSubmit(data) {

    var url = this.defaultPostURL + data['productID'];

    if (data["totalCost"] == "0"){
      data["totalCost"] = 0;
    } 
    else if (data["totalCost"] == "" || data["totalCost"] == null){
      data["totalCost"] = -1;
    }

    this.http.post(url, data)
    .subscribe((result)=>{

      this._snackBar.open(result['value'], "Dismiss", {
        duration: 6000,
        panelClass: ['success-snackbar']
      });

      this.sellService.redoGet.next();
      this.productService.redoGet.next();
      url = this.defaultPostURL;
      
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

      url = this.defaultPostURL;

    });
  }

  ngOnInit(){

  }

}
