import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

/*Components*/
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { OrderPageComponent } from './Orders/order-page/order-page.component';
import { OrderTableComponent } from './Orders/order-table/order-table.component'
import { LogInPageComponent } from './UserAccount/log-in-page/log-in-page.component';
import { OrderEditFormComponent } from './Orders/OrderForms/order-edit-form/order-edit-form.component';
import { OrderDeleteFormComponent } from './Orders/OrderForms/order-delete-form/order-delete-form.component';
import { OrderAddFormComponent } from './Orders/OrderForms/order-add-form/order-add-form.component';
import { OrderFormTabsComponent } from './Orders/OrderForms/order-form-tabs/order-form-tabs.component';

/*Material*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { CounterPageComponent } from './Counter/counter-page/counter-page.component';
import { UserAccountPageComponent } from './UserAccount/user-account-page/user-account-page.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { CounterTableComponent } from './Counter/counter-table/counter-table.component';
import { TableFilteringExample } from './table-filtering-example/table-filtering-example.component';

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
    OrderPageComponent,
    OrderTableComponent,
    OrderFormTabsComponent,
    OrderAddFormComponent,
    OrderEditFormComponent,
    OrderDeleteFormComponent,
    CounterPageComponent,
    UserAccountPageComponent,
    LogInPageComponent,
    HomePageComponent,
    CounterTableComponent,
    TableFilteringExample,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRippleModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
