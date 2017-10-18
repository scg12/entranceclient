import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConfigsComponent } from './general-configs.component';

describe('GeneralConfigsComponent', () => {
  let component: GeneralConfigsComponent;
  let fixture: ComponentFixture<GeneralConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
