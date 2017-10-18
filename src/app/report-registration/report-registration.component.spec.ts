import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRegistrationComponent } from './report-registration.component';

describe('ReportRegistrationComponent', () => {
  let component: ReportRegistrationComponent;
  let fixture: ComponentFixture<ReportRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
