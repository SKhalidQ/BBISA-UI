import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormTabsComponent } from './order-form-tabs.component';

describe('OrderFormTabsComponent', () => {
  let component: OrderFormTabsComponent;
  let fixture: ComponentFixture<OrderFormTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFormTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFormTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
