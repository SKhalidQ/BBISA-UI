import { ProgressBarService } from '../../../../Services/Progress Bar/progress-bar.service';
import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private productService: ProductService,
    private progBarService: ProgressBarService
  ) {}

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Products/EliminateProduct';

  deleteProduct = new FormGroup({
    productID: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {}

  //#region Delete Request
  onSubmit() {
    this.progBarService.runProgressBar.next(true);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: this.deleteProduct.value['productID'],
    };

    this.http.delete(this.defaultURL, httpOptions).subscribe(
      (result) => {
        this._snackBar.open(result['value'], 'Dismiss', {
          duration: 6000,
          panelClass: ['success-snackbar'],
        });

        this.productService.redoGet.next();
        // this.postProduct.reset();
        // this.postProduct.markAsPristine();
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
        this.progBarService.runProgressBar.next(false);
      }
    );
  }
  //#endregion

  //#region Validation
  getErrorMessage(fieldName: string) {
    var field = this.deleteProduct.get(fieldName);
    var required = 'Field is required';
    var minValue = 'Must contain a minimum value of 1';

    if (field.hasError('required')) return required;

    if (field.hasError('min')) return minValue;

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.deleteProduct.get(fieldName);
  }

  //#endregion
}
