import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellTabsComponent } from './sell-tabs.component';

describe('SellTabsComponent', () => {
  let component: SellTabsComponent;
  let fixture: ComponentFixture<SellTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
