import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterTableComponent } from './counter-table.component';

describe('CounterTableComponent', () => {
  let component: CounterTableComponent;
  let fixture: ComponentFixture<CounterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
