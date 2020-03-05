import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

/*Components*/
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { OrderPageComponent } from './Orders/order-page/order-page.component';
import { OrderTableComponent } from './Orders/order-table/order-table.component'
import { LogInPageComponent } from './UserAccount/log-in-page/log-in-page.component';
import { OrderAddFormComponent } from './Orders/OrderForms/order-add-form/order-add-form.component';
import { OrderFormTabsComponent } from './Orders/OrderForms/order-form-tabs/order-form-tabs.component';
import { OrderEditFormComponent } from './Orders/OrderForms/order-edit-form/order-edit-form.component';
import { OrderDeleteFormComponent } from './Orders/OrderForms/order-delete-form/order-delete-form.component';

/*Material*/
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CounterPageComponent } from './Counter/counter-page/counter-page.component';
import { CounterTableComponent } from './Counter/counter-table/counter-table.component';
import { TableFilteringExample } from './table-filtering-example/table-filtering-example.component';
import { UserAccountPageComponent } from './UserAccount/user-account-page/user-account-page.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Orders', component: OrderPageComponent },
  { path: 'Counter', component: CounterPageComponent },
  { path: 'User-Account', component: UserAccountPageComponent },
  { path: 'Log-In', component: LogInPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomePageComponent,
    OrderPageComponent,
    LogInPageComponent,
    OrderTableComponent,
    CounterPageComponent,
    OrderAddFormComponent,
    CounterTableComponent,
    TableFilteringExample,
    OrderFormTabsComponent,
    OrderEditFormComponent,
    OrderDeleteFormComponent,
    UserAccountPageComponent,
  ],
  imports: [
    FormsModule,
    LayoutModule,
    BrowserModule,
    MatSortModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatTreeModule,
    MatBadgeModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    AppRoutingModule,
    MatStepperModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatGridListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatBottomSheetModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
