import { ProgressBarService } from '../../../../Services/Progress Bar/progress-bar.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ProductService } from './../../../../Services/Product/product.service';
import { OrderService } from './../../../../Services/Order/order.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.css'],
})
export class OrderDeleteComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private orderService: OrderService,
    private productService: ProductService,
    private progBarService: ProgressBarService
  ) {}
  
  private apiURL = environment.apiURL + '/Orders/EliminateOrder';

  deleteOrder = new FormGroup({
    orderID: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {}

  //#region Delete Request
  onSubmit() {
    this.progBarService.runProgressBar.next(true);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: this.deleteOrder.value['orderID'],
    };

    this.http.delete(this.apiURL, httpOptions).subscribe(
      (result) => {
        this._snackBar.open(result['value'], 'Dismiss', {
          duration: 6000,
          panelClass: ['success-snackbar'],
        });

        this.orderService.redoGet.next();
        this.productService.redoGet.next();
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
        this.progBarService.runProgressBar.next(false);
      }
    );
  }
  //#endregion

  //#region Validation
  getErrorMessage(fieldName: string) {
    var field = this.deleteOrder.get(fieldName);
    var required = 'Field is required';
    var minIDValue = 'Minimum value of 1';

    if (field.hasError('required')) return required;

    if (field.hasError('min')) return minIDValue;

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.deleteOrder.get(fieldName);
  }

  //#endregion
}
