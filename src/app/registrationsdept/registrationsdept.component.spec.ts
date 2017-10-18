import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsdeptComponent } from './registrationsdept.component';

describe('RegistrationsdeptComponent', () => {
  let component: RegistrationsdeptComponent;
  let fixture: ComponentFixture<RegistrationsdeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationsdeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsdeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
