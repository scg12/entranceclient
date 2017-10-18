import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForpdfComponent } from './forpdf.component';

describe('ForpdfComponent', () => {
  let component: ForpdfComponent;
  let fixture: ComponentFixture<ForpdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForpdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
