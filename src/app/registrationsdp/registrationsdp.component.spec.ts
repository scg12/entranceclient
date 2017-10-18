import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsdpComponent } from './registrationsdp.component';

describe('RegistrationsdpComponent', () => {
  let component: RegistrationsdpComponent;
  let fixture: ComponentFixture<RegistrationsdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationsdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
