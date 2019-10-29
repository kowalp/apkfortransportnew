import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvidualComponent } from './edit-invidual.component';

describe('EditInvidualComponent', () => {
  let component: EditInvidualComponent;
  let fixture: ComponentFixture<EditInvidualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInvidualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvidualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
