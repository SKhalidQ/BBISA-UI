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

  private defaultURL = 'https://localhost:5001/API';
  private azureURL = 'https://bbisa.azurewebsites.net/api';

  verifyUser = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  onSubmit() {
    this.progBarService.runProgressBar.next(true);

    this._http.get(this.azureURL + '/Status/CurrentStatus').subscribe();

    this._http.post(this.azureURL + '/Users/VerifyUser', this.verifyUser.value).subscribe(
      (result) => {
        // `Welcome ${this.verifyUser.value['username']}`
        this._snackBar.open(result['value'], 'Dismiss', {
          duration: 4000,
          panelClass: 'logging-snackbar',
        });
        this.router.navigateByUrl('/Dashboard');
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
