import { ProgressBarService } from '../../../../Services/Progress Bar/progress-bar.service';
import { ProductService } from './../../../../Services/Product/product.service';
import { OrderService } from './../../../../Services/Order/order.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Orders/AddOrder?ProductID=';

  addOrder = new FormGroup({
    productID: new FormControl('', [Validators.required, Validators.min(1)]),
    quantityOrdered: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    totalCost: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(999.99)]),
  });

  ngOnInit(): void {}

  //#region Post Request
  onSubmit() {
    this.progBarService.runProgressBar.next(true);

    var url = this.defaultURL + this.addOrder.value['productID'];

    this.http.post(url, this.addOrder.value).subscribe(
      (result) => {
        this._snackBar.open(result['value'].value, 'Dismiss', {
          duration: 6000,
          panelClass: ['success-snackbar'],
        });

        this.orderService.redoGet.next();
        this.productService.redoGet.next();
        url = this.defaultURL;
        this.progBarService.runProgressBar.next(false);
      },
      (error) => {
        var message = error.error['value'];

        if (error.status == 400) {
          message = 'One or more validation errors';
        }

        this._snackBar.open(message, 'Dismiss', {
          duration: 6000,
          panelClass: ['fail-snackbar'],
        });

        url = this.defaultURL;
        this.progBarService.runProgressBar.next(false);
      }
    );
  }
  //#endregion

  //#region Validation
  getErrorMessage(fieldName: string) {
    var field = this.addOrder.get(fieldName);
    var required = 'Field is required';
    var maxLength = fieldName + ' has hit its max length';

    if (field.hasError('required')) return required;

    // if (field.hasError('max')) return maxLength;

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.addOrder.get(fieldName);
  }
  //#endregion
}
