import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositcenterComponent } from './depositcenter.component';

describe('DepositcenterComponent', () => {
  let component: DepositcenterComponent;
  let fixture: ComponentFixture<DepositcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
