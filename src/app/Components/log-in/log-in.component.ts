import { ProgressBarService } from './../../Services/Progress Bar/progress-bar.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(private _http: HttpClient, private _snackBar: MatSnackBar, private router: Router, private progBarService: ProgressBarService) {}

  private defaultURL = 'https://bbisa.azurewebsites.net/api/Users/VerifyUser';

  verifyUser = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(5), Validators.max(20)]),
  });

  ngOnInit(): void {}

  onSubmit() {
    this.progBarService.runProgressBar.next(true);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        username: this.verifyUser.value['username'],
        password: this.verifyUser.value['password'],
      }),
    };

    this._http.options(this.defaultURL, httpOptions).subscribe(
      (result) => {
        this._snackBar.open(`Welcome ${this.verifyUser.value['username']}`, 'Dismiss', {
          duration: 4000,
          panelClass: 'loggedIn-snackbar',
        });
        this.router.navigateByUrl('/Dashboard');
        this.progBarService.runProgressBar.next(false);
      },
      (error) => {
        var message = 'Unknown error';

        if (error.status == 401) {
          message = 'Wrong username or password';
        }

        this._snackBar.open(message, 'Dismiss', {
          duration: 6000,
          panelClass: ['fail-snackbar'],
        });
        this.progBarService.runProgressBar.next(false);
      }
    );
  }

  //#region Validation
  getErrorMessage(fieldName: string) {
    var field = this.verifyUser.get(fieldName);
    var required = 'Field is required';

    if (field.hasError('required')) return required;

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.verifyUser.get(fieldName);
  }
  //#endregion
}
