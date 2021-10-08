import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPromotionComponent } from './catalog-promotion.component';

describe('CatalogPromotionComponent', () => {
  let component: CatalogPromotionComponent;
  let fixture: ComponentFixture<CatalogPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
