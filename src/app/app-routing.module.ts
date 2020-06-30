import { PubProductTableComponent } from './Components/Public/Tables/pub-product-table/pub-product-table.component';
import { SellsComponent } from './Components/Sell/sells/sells.component';
import { OrdersComponent } from './Components/Order/orders/orders.component';
import { ProductsComponent } from './Components/Product/products/products.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Components/UserAccount/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'LogIn', component: LogInComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'Products', component: PubProductTableComponent },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    children: [
      { path: 'Product', component: ProductsComponent },
      { path: 'Orders', component: OrdersComponent },
      { path: 'Sell', component: SellsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
