import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadRegistrationComponent } from './download-registration.component';

describe('DownloadRegistrationComponent', () => {
  let component: DownloadRegistrationComponent;
  let fixture: ComponentFixture<DownloadRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
