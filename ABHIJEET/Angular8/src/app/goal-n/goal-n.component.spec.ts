import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalNComponent } from './goal-n.component';

describe('GoalNComponent', () => {
  let component: GoalNComponent;
  let fixture: ComponentFixture<GoalNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
