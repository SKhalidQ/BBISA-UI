import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {

  @Output() buttonClick = new EventEmitter<string>();
  @Output() hideShow = false;

  position = new FormControl('below');

  constructor() { }
  
  ngOnInit(): void {
    
  }

  showHideComponent(){
    this.hideShow = !this.hideShow;
  }

}
