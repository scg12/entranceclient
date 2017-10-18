import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonValidatedRegistrationsComponent } from './non-validated-registrations.component';

describe('NonValidatedRegistrationsComponent', () => {
  let component: NonValidatedRegistrationsComponent;
  let fixture: ComponentFixture<NonValidatedRegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonValidatedRegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonValidatedRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
