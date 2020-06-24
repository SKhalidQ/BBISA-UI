import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Components/UserAccount/dashboard/dashboard.component';


const routes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'LogIn', component: LogInComponent},
  {path: 'SignUp', component: SignUpComponent},
  {path: 'Dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
