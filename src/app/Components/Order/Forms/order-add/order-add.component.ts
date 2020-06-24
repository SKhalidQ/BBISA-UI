import { ProductService } from './../../../../Services/Product/product.service';
import { OrderService } from './../../../../Services/Order/order.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  constructor(
    private http:HttpClient, 
    private _snackBar: MatSnackBar, 
    private orderService: OrderService,
    private productService: ProductService
  ) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Orders/AddOrder?ProductID=';

  onSubmit(data) {

    var url = this.defaultURL +  data['productID'];

    this.http.post(url, data)
    .subscribe((result)=>{

      this._snackBar.open(result['value'].value, "Dismiss", {
        duration: 6000,
        panelClass: ['success-snackbar']
      });

      this.orderService.redoGet.next();
      this.productService.redoGet.next();
      url = this.defaultURL;
      
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

      url = this.defaultURL;

    })
  }

  ngOnInit(): void { 
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
