import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-tabs',
  templateUrl: './order-tabs.component.html',
  styleUrls: ['./order-tabs.component.css'],
})
export class OrderTabsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
}
