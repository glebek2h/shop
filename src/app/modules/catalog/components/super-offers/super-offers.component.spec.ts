import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperOffersComponent } from './super-offers.component';

describe('SuperOffersComponent', () => {
  let component: SuperOffersComponent;
  let fixture: ComponentFixture<SuperOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
