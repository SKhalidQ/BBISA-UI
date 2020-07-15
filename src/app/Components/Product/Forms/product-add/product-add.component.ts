import { ProgressBarService } from '../../../../Services/Progress Bar/progress-bar.service';
import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit } from '@angular/core';
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
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private productService: ProductService,
    private progBarService: ProgressBarService
  ) {}

  checkedA = false;
  checkedR = false;
  validation = false;
  showDiscountBox = false;

  discountBox: number;

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Products/AddProduct';

  postProduct = new FormGroup({
    brand: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    flavour: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    alcoholic: new FormControl(false),
    containerType: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    returnable: new FormControl(false),
    sellPrice: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(999.99)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
  });

  myControl = new FormControl();
  options: string[] = ['Bottle', 'Can', 'Keg', 'Plastic'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.postProduct.get('containerType').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  onShowDiscount(event: any) {
    this.showDiscountBox = event.checked;
  }

  //#region Post Request
  onSubmit() {
    this.progBarService.runProgressBar.next(true);

    this.http.post(this.defaultURL, this.postProduct.value).subscribe(
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
    var field = this.postProduct.get(fieldName);
    var required = 'Field is required';
    var maxDiscount = 'Maximum is 100%';
    var minDiscount = 'Minimum is 0%';
    var maxSellPrice = 'Maximum is £999.99';
    var minValue = 'Minimum value of £0.01';
    var wholeNumber = 'Whole numbers only [0 - 100]';

    if (field.hasError('required')) return required;

    if (field.hasError('min')) {
      if (fieldName == 'discount') return minDiscount;
      else return minValue;
    }

    if (field.hasError('pattern')) return wholeNumber;

    if (field.hasError('max')) {
      if (fieldName == 'discount') return maxDiscount;
      else return maxSellPrice;
    }

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.postProduct.get(fieldName);
  }

  roundMethod(value: number) {
    value = Math.floor(this.postProduct.value['discount']);
    this.discountBox = value;
  }
  //#endregion

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
