import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsContentComponent } from './graphs-content.component';

describe('GraphsContentComponent', () => {
  let component: GraphsContentComponent;
  let fixture: ComponentFixture<GraphsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
