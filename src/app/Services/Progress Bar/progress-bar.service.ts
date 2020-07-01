import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  runProgressBar = new BehaviorSubject<boolean>(false);

  progressBarLoading$ = this.runProgressBar.asObservable();

  constructor() {}
}
