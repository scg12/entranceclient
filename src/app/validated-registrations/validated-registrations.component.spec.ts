import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedRegistrationsComponent } from './validated-registrations.component';

describe('ValidatedRegistrationsComponent', () => {
  let component: ValidatedRegistrationsComponent;
  let fixture: ComponentFixture<ValidatedRegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatedRegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatedRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
