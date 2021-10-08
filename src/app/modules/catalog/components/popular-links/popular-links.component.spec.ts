import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularLinksComponent } from './popular-links.component';

describe('PopularLinksComponent', () => {
  let component: PopularLinksComponent;
  let fixture: ComponentFixture<PopularLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
