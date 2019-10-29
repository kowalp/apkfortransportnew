import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForNowComponent } from './for-now.component';

describe('ForNowComponent', () => {
  let component: ForNowComponent;
  let fixture: ComponentFixture<ForNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
