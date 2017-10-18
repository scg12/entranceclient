import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowRefComponent } from './window-ref.component';

describe('WindowRefComponent', () => {
  let component: WindowRefComponent;
  let fixture: ComponentFixture<WindowRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
