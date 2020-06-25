import { DashboardMenuComponent } from './../dashboard-menu/dashboard-menu.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showComp2: boolean = false;

  switches: string = "product";

  constructor() { }

  ngOnInit(): void {
    
  }

  hideShowComponent() {
    
  }

}
