import { ProgressBarService } from './../../../../Services/progress-bar.service';
import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    private _productService: ProductService,
    private _progBarService: ProgressBarService
  ) {}

  checkedA = false;
  checkedR = false;
  validation = false;
  showDiscountBox = false;

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Products/AddProduct';

  postProduct = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    flavour: new FormControl('', [Validators.required]),
    alcoholic: new FormControl(false),
    containerType: new FormControl('', [Validators.required]),
    returnable: new FormControl(false),
    sellPrice: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(999.99)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
  });

  options: string[] = ['Bottle', 'Can', 'Keg', 'Plastic'];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  onShowDiscount(event: any) {
    this.showDiscountBox = event.checked;
  }

  //#region Post Request
  onSubmit() {
    this._progBarService.runProgressBar.next(true);

    this._http.post(this.defaultURL, this.postProduct.value).subscribe(
      (result) => {
        this._snackBar.open(result['value'].value, 'Dismiss', {
          duration: 6000,
          panelClass: ['success-snackbar'],
        });

        this._productService.redoGet.next();
        this._progBarService.runProgressBar.next(false);
      },
      (error) => {
        console.log(error.error);

        var message = error.error;

        if (error.status == 400) {
          message = 'One or more validation errors';
        }

        this._snackBar.open(message, 'Dismiss', {
          duration: 6000,
          panelClass: ['fail-snackbar'],
        });

        this._progBarService.runProgressBar.next(false);
      }
    );
  }

  //#endregion

  //#region Validation
  getErrorMessage(fieldName: string) {
    var field = this.postProduct.get(fieldName);
    var required = 'Field is required';
    var maxDiscount = 'Maximum is 100%';
    var maxSellPrice = 'Maximum is £999.99';

    if (field.hasError('required')) return required;

    if (field.hasError('max'))
      if (fieldName == 'discount') return maxDiscount;
      else return maxSellPrice;

    // if (field.hasError('max')) return maxLength;

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.postProduct.get(fieldName);
  }
  //#endregion

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
