/*Angular*/
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';

/*Components*/
import { OrderDeleteFormComponent } from './Orders/OrderForms/order-delete-form/order-delete-form.component';
import { OrderEditFormComponent } from './Orders/OrderForms/order-edit-form/order-edit-form.component';
import { OrderFormTabsComponent } from './Orders/OrderForms/order-form-tabs/order-form-tabs.component';
import { OrderAddFormComponent } from './Orders/OrderForms/order-add-form/order-add-form.component';
import { LogInPageComponent } from './UserAccount/log-in-page/log-in-page.component';
import { OrderTableComponent } from './Orders/order-table/order-table.component'
import { OrderPageComponent } from './Orders/order-page/order-page.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*Material*/
import { UserAccountPageComponent } from './UserAccount/user-account-page/user-account-page.component';
import { TableFilteringExample } from './table-filtering-example/table-filtering-example.component';
import { CounterTableComponent } from './Counter/counter-table/counter-table.component';
import { CounterPageComponent } from './Counter/counter-page/counter-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';

const appRoutes: Routes = [
  { path: 'User-Account', component: UserAccountPageComponent },
  { path: 'Counter', component: CounterPageComponent },
  { path: 'Orders', component: OrderPageComponent },
  { path: 'Log-In', component: LogInPageComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [
    UserAccountPageComponent,
    OrderDeleteFormComponent,
    OrderEditFormComponent,
    OrderFormTabsComponent,
    TableFilteringExample,
    CounterTableComponent,
    OrderAddFormComponent,
    CounterPageComponent,
    OrderTableComponent,
    LogInPageComponent,
    OrderPageComponent,
    HomePageComponent,
    MainNavComponent,
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatGridListModule,
    AppRoutingModule,
    MatStepperModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatBadgeModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatRadioModule,
    MatSortModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatTreeModule,
    BrowserModule,
    LayoutModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
