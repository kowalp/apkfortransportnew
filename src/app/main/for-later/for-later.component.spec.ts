import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForLaterComponent } from './for-later.component';

describe('ForLaterComponent', () => {
  let component: ForLaterComponent;
  let fixture: ComponentFixture<ForLaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForLaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
