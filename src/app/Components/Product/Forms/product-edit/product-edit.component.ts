import { ProgressBarService } from './../../../../Services/progress-bar.service';
import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Products/UpdateInfo';

  editProduct = new FormGroup({
    productID: new FormControl('', [Validators.required]),
    returnable: new FormControl(false),
    sellPrice: new FormControl('', [Validators.min(0.01), Validators.max(999.99)]),
    discount: new FormControl('', [Validators.max(100)]),
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

    this.http.put(this.defaultURL, this.editProduct.value).subscribe(
      (result) => {
        this._snackBar.open(result['value'], 'Dismiss', {
          duration: 6000,
          panelClass: ['success-snackbar'],
        });

        this.productService.redoGet.next();
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
    var field = this.editProduct.get(fieldName);
    var required = 'Field is required';
    var maxLength = fieldName + ' has hit its max length';

    if (field.hasError('required')) return required;

    // if (field.hasError('max')) return maxLength;

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.editProduct.get(fieldName);
  }
  //#endregion
}
