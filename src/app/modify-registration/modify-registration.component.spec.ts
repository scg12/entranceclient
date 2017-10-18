import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRegistrationComponent } from './modify-registration.component';

describe('ModifyRegistrationComponent', () => {
  let component: ModifyRegistrationComponent;
  let fixture: ComponentFixture<ModifyRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
