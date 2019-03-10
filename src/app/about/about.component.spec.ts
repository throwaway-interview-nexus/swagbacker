import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three content sections', () => {
    const contents = fixture.debugElement.queryAll(By.css('.content'));
    expect(contents.length).toEqual(3);
  });
});
