import { ProgressBarService } from '../../../../Services/Progress Bar/progress-bar.service';
import { ProductService } from './../../../../Services/Product/product.service';
import { OrderService } from './../../../../Services/Order/order.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class OrderAddComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private orderService: OrderService,
    private productService: ProductService,
    private progBarService: ProgressBarService
  ) {}
  
  private apiURL = environment.apiURL + '/Orders/AddOrder?ProductID=';

  addOrder = new FormGroup({
    productID: new FormControl('', [Validators.required, Validators.min(1)]),
    quantityOrdered: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    totalCost: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(999.99)]),
  });

  ngOnInit(): void {}

  //#region Post Request
  onSubmit() {
    this.progBarService.runProgressBar.next(true);

    var url = this.apiURL + this.addOrder.value['productID'];

    this.http.post(url, this.addOrder.value).subscribe(
      (result) => {
        this._snackBar.open(result['value'], 'Dismiss', {
          duration: 6000,
          panelClass: ['success-snackbar'],
        });

        this.orderService.redoGet.next();
        this.productService.redoGet.next();
        url = this.apiURL;
        // this.postProduct.reset();
        // this.postProduct.markAsPristine();
        this.progBarService.runProgressBar.next(false);
      },
      (error) => {
        var message = error.error['value'];

        if (error.status == 400 && error.error['title'] == 'One or more validation errors occurred.') {
          message = error.error['title'];
        } else if (error.error['value'] == null) {
          message = 'No response from the server';
        }

        this._snackBar.open(message, 'Dismiss', {
          duration: 6000,
          panelClass: ['fail-snackbar'],
        });

        url = this.apiURL;
        this.progBarService.runProgressBar.next(false);
      }
    );
  }
  //#endregion

  //#region Validation
  getErrorMessage(fieldName: string) {
    var field = this.addOrder.get(fieldName);
    var required = 'Field is required';
    var minValue = 'Minimum value of £0.01';
    var minIDValue = 'Minimum value of 1';
    var maxSellPrice = 'Maximum is £999.99';
    var maxQuantity = 'Maximum is 999';

    if (field.hasError('required')) return required;

    if (field.hasError('min')) {
      if (fieldName == 'totalCost') return minValue;
      else return minIDValue;
    }

    if (field.hasError('max')) {
      if (fieldName == 'quantityOrdered') return maxQuantity;
      else return maxSellPrice;
    }

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.addOrder.get(fieldName);
  }
  //#endregion
}
