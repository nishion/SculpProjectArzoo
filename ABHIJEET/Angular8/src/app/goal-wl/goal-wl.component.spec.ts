import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalWLComponent } from './goal-wl.component';

describe('GoalWLComponent', () => {
  let component: GoalWLComponent;
  let fixture: ComponentFixture<GoalWLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalWLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalWLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
