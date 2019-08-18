import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSTComponent } from './goal-st.component';

describe('GoalSTComponent', () => {
  let component: GoalSTComponent;
  let fixture: ComponentFixture<GoalSTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalSTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalSTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
