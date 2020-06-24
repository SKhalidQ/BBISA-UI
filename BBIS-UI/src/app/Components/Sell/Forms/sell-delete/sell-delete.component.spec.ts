import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellDeleteComponent } from './sell-delete.component';

describe('SellDeleteComponent', () => {
  let component: SellDeleteComponent;
  let fixture: ComponentFixture<SellDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
