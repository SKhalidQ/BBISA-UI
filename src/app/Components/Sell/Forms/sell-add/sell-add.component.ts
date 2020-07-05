import { ProgressBarService } from '../../../../Services/Progress Bar/progress-bar.service';
import { ProductService } from './../../../../Services/Product/product.service';
import { SellService } from './../../../../Services/Sell/sell.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell-add',
  templateUrl: './sell-add.component.html',
  styleUrls: ['./sell-add.component.css'],
})
export class SellAddComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private sellService: SellService,
    private productService: ProductService,
    private progBarService: ProgressBarService
  ) {}

  checkedR = false;

  enableSubtotalBox = false;
  enablePayBox = false;
  enableChangeBox = false;
  disablePurchaseButton = true;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  totalCost: number;
  changeDue: number;

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Sell';

  postSell = new FormGroup({
    productID: new FormControl('', [Validators.required, Validators.min(1)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    containerReturned: new FormControl(false),
    totalCost: new FormControl('', [Validators.required, Validators.min(0.01)]),
    payed: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(999.99)]),
    change: new FormControl(''),
  });

  ngOnInit() {}

  //#region Get & Post Request
  getSubtotal() {
    this.progBarService.runProgressBar.next(true);

    var url =
      this.defaultURL +
      '/GetSubTotalSell?ProductID=' +
      this.postSell.value['productID'] +
      '&Quantity=' +
      this.postSell.value['quantity'] +
      '&ContainerReturned=' +
      this.postSell.value['containerReturned'];

    this.http.get(url).subscribe(
      (result) => {
        this._snackBar.open('Subtotal: £ ' + result['value'].toFixed(2), 'Dismiss', {
          duration: 4000,
          panelClass: ['success-snackbar'],
        });

        this.enableChangeBox = false;
        this.enablePayBox = true;
        this.enableSubtotalBox = true;
        this.disablePurchaseButton = false;

        this.totalCost = result['value'].toFixed(2);
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

        this.enablePayBox = false;
        this.enableSubtotalBox = false;
        this.disablePurchaseButton = true;

        url = this.defaultURL;
        this.progBarService.runProgressBar.next(false);
      }
    );
  }

  onSubmit() {
    this.progBarService.runProgressBar.next(true);

    var url = this.defaultURL + '/AddSell?ProductID=' + this.postSell.value['productID'];

    if (this.postSell.value['totalCost'] == '0') {
      this.postSell.value['totalCost'] = 0;
    } else if (this.postSell.value['totalCost'] == '' || this.postSell.value['totalCost'] == null) {
      this.postSell.value['totalCost'] = -1;
    }

    this.http.post(url, this.postSell.value).subscribe(
      (result) => {
        this._snackBar.open('Purchase successful', 'Dismiss', {
          duration: 6000,
          panelClass: ['success-snackbar'],
        });

        this.changeDue = result['value'].toFixed(2);

        this.enableChangeBox = true;
        this.sellService.redoGet.next();
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
    var field = this.postSell.get(fieldName);
    var required = 'Field is required';
    var minValue = 'Minimum value of £0.01';
    var minIDValue = 'Minimum value of 1';
    var maxSellPrice = 'Maximum is £999.99';
    var maxQuantity = 'Maximum is 999';

    if (field.hasError('required')) return required;

    if (field.hasError('min')) {
      if (fieldName == 'payed') return minValue;
      else return minIDValue;
    }

    if (field.hasError('max')) {
      if (fieldName == 'quantity') return maxQuantity;
      else return maxSellPrice;
    }

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.postSell.get(fieldName);
  }
  //#endregion
}
