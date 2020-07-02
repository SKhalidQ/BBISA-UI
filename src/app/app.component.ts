import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgressBarService } from './Services/Progress Bar/progress-bar.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [],
})
export class AppComponent implements OnInit {
  title = 'Beer Bottle Inventory System UI';

  internetConnection: boolean;

  constructor(public progBarService: ProgressBarService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.checkConnectionStatus$().subscribe((connStatus: boolean) => console.log('Connection Status is', connStatus));
  }

  checkConnectionStatus$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
