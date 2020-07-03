import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SideNavListComponent } from './Components/Navigation/side-nav-list/side-nav-list.component';
import { HeaderComponent } from './Components/Navigation/header/header.component';
import { ProductTableComponent } from './Components/Product/Table/product-table/product-table.component';
import { ProductAddComponent } from './Components/Product/Forms/product-add/product-add.component';
import { ProductEditComponent } from './Components/Product/Forms/product-edit/product-edit.component';
import { ProductDeleteComponent } from './Components/Product/Forms/product-delete/product-delete.component';
import { OrderAddComponent } from './Components/Order/Forms/order-add/order-add.component';
import { OrderDeleteComponent } from './Components/Order/Forms/order-delete/order-delete.component';
import { OrderTableComponent } from './Components/Order/Table/order-table/order-table.component';
import { SellTableComponent } from './Components/Sell/Table/sell-table/sell-table.component';
import { SellAddComponent } from './Components/Sell/Forms/sell-add/sell-add.component';
import { SellEditComponent } from './Components/Sell/Forms/sell-edit/sell-edit.component';
import { SellDeleteComponent } from './Components/Sell/Forms/sell-delete/sell-delete.component';
import { SellTabsComponent } from './Components/Sell/Forms/sell-tabs/sell-tabs.component';
import { ProductTabsComponent } from './Components/Product/Forms/product-tabs/product-tabs.component';
import { OrderTabsComponent } from './Components/Order/Forms/order-tabs/order-tabs.component';
import { OrderEditComponent } from './Components/Order/Forms/order-edit/order-edit.component';
import { DashboardMenuComponent } from './Components/UserAccount/dashboard-menu/dashboard-menu.component';
import { DashboardComponent } from './Components/UserAccount/dashboard/dashboard.component';
import { ProductsComponent } from './Components/Product/products/products.component';
import { PubProductTableComponent } from './Components/Public/Tables/pub-product-table/pub-product-table.component';
import { OrdersComponent } from './Components/Order/orders/orders.component';
import { SellsComponent } from './Components/Sell/sells/sells.component';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

//Services
import { SellService } from './Services/Sell/sell.service';
import { OrderService } from './Services/Order/order.service';
import { ProductService } from './Services/Product/product.service';

//Pipes
import { BooleanValuesPipe } from './Pipes/boolean-values.pipe';
import { StockBooleanPipe } from './Pipes/stock-boolean.pipe';

//Other Libraries
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    SignUpComponent,
    HeaderComponent,
    SideNavListComponent,
    ProductTableComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    OrderAddComponent,
    OrderDeleteComponent,
    OrderTableComponent,
    SellTableComponent,
    SellAddComponent,
    SellEditComponent,
    SellDeleteComponent,
    SellTabsComponent,
    ProductTabsComponent,
    OrderTabsComponent,
    BooleanValuesPipe,
    OrderEditComponent,
    DashboardMenuComponent,
    DashboardComponent,
    ProductsComponent,
    SellsComponent,
    OrdersComponent,
    PubProductTableComponent,
    StockBooleanPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  providers: [ProductService, OrderService, SellService],
  bootstrap: [AppComponent],
})
export class AppModule {}
