import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubProductTableComponent } from './pub-product-table.component';

describe('PubProductTableComponent', () => {
  let component: PubProductTableComponent;
  let fixture: ComponentFixture<PubProductTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubProductTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
