import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeleteFormComponent } from './order-delete-form.component';

describe('OrderDeleteFormComponent', () => {
  let component: OrderDeleteFormComponent;
  let fixture: ComponentFixture<OrderDeleteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDeleteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
