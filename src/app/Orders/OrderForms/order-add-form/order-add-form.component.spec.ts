import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddFormComponent } from './order-add-form.component';

describe('OrderAddFormComponent', () => {
  let component: OrderAddFormComponent;
  let fixture: ComponentFixture<OrderAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
