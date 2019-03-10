import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalStatusComponent } from './goal-status.component';

describe('GoalStatusComponent', () => {
  let component: GoalStatusComponent;
  let fixture: ComponentFixture<GoalStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
