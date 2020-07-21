import { ProgressBarService } from '../../../../Services/Progress Bar/progress-bar.service';
import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private productService: ProductService,
    private progBarService: ProgressBarService
  ) {}

  checkedA = false;
  checkedR = false;

  discountBox: number;

  private azureURL = 'https://localhost:5001/API/Products/UpdateInfo';
  private azureURL = 'https://bbisa.azurewebsites.net/api/Products/UpdateInfo';

  editProduct = new FormGroup({
    productID: new FormControl('', [Validators.required, Validators.min(1)]),
    returnable: new FormControl(false),
    sellPrice: new FormControl('', [Validators.min(0.01), Validators.max(999.99)]),
    discount: new FormControl('', [Validators.min(0), Validators.max(100)]),
  });

  ngOnInit(): void {}

  //#region Put Request
  onSubmit() {
    this.progBarService.runProgressBar.next(true);

    if (this.editProduct.value['stockAmount'] == '0') {
      this.editProduct.value['stockAmount'] = 0;
    } else if (this.editProduct.value['stockAmount'] == '' || this.editProduct.value['stockAmount'] == null) {
      this.editProduct.value['stockAmount'] = -1;
    }

    if (this.editProduct.value['sellPrice'] == '-1' || this.editProduct.value['discount'] == '-1') {
      this._snackBar.open('One or more validation errors', 'Dismiss', {
        duration: 6000,
        panelClass: ['fail-snackbar'],
      });
      this.progBarService.runProgressBar.next(false);
      throw new Error('Cannot post -1');
    }

    if (this.editProduct.value['sellPrice'] == '0') {
      this.editProduct.value['sellPrice'] = 0;
    } else if (this.editProduct.value['sellPrice'] == '' || this.editProduct.value['sellPrice'] == null) {
      this.editProduct.value['sellPrice'] = -1;
    }

    if (this.editProduct.value['discount'] == '0') {
      this.editProduct.value['discount'] = 0;
    } else if (this.editProduct.value['discount'] == '' || this.editProduct.value['discount'] == null) {
      this.editProduct.value['discount'] = -1;
    }

    this.http.put(this.azureURL, this.editProduct.value).subscribe(
      (result) => {
        this._snackBar.open(result['value'], 'Dismiss', {
          duration: 6000,
          panelClass: ['success-snackbar'],
        });

        this.productService.redoGet.next();
        this.editProduct.value['sellPrice'] = null;
        this.editProduct.value['discount'] = null;
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
    var field = this.editProduct.get(fieldName);
    var required = 'Field is required';
    var minIDValue = 'Minimum value of 1';
    var minValue = 'Minimum value of £0.01';
    var minDiscount = 'Minimum is 0%';
    var maxDiscount = 'Maximum is 100%';
    var maxSellPrice = 'Maximum is £999.99';
    var wholeNumber = 'Whole numbers only [0 - 100]';

    if (field.hasError('required')) return required;

    if (field.hasError('pattern')) return wholeNumber;

    if (field.hasError('min')) {
      if (fieldName == 'productID') return minIDValue;
      if (fieldName == 'discount') return minDiscount;
      else return minValue;
    }

    if (field.hasError('max')) {
      if (fieldName == 'discount') return maxDiscount;
      else return maxSellPrice;
    }

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.editProduct.get(fieldName);
  }

  roundMethod(value: number) {
    value = Math.floor(this.editProduct.value['discount']);
    this.discountBox = value;
  }
  //#endregion
}
