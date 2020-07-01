import { ProgressBarService } from './../../../Services/Progress Bar/progress-bar.service';
import { SellService } from './../../../Services/Sell/sell.service';
import { OrderService } from './../../../Services/Order/order.service';
import { ProductService } from './../../../Services/Product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
})
export class DashboardMenuComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<string>();
  @Output() hideShow = false;

  position = new FormControl('below');

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private productService: ProductService,
    private orderService: OrderService,
    private sellService: SellService,
    private progBarService: ProgressBarService
  ) {}

  ngOnInit(): void {}

  showHideComponent() {
    this.hideShow = !this.hideShow;
  }

  resetDatabase() {
    this.progBarService.runProgressBar.next(true);

    var url = 'https://bbisa.azurewebsites.net/api/Status/ClearDatabase';

    this.http.options(url).subscribe(
      (result) => {
        console.log(result);
        this._snackBar.open(result.toString(), 'Dismiss', {
          duration: 4000,
          panelClass: ['success-snackbar'],
        });

        this.productService.redoGet.next();
        this.orderService.redoGet.next();
        this.sellService.redoGet.next();
        this.progBarService.runProgressBar.next(false);
      },
      (error) => {
        var message = error.error['value'];
        console.log(error);

        if (error.status == 400) {
          message = 'Internal server error';
        }

        this._snackBar.open(message, 'Dismiss', {
          duration: 6000,
          panelClass: ['fail-snackbar'],
        });
        this.progBarService.runProgressBar.next(false);
      }
    );
  }
}
