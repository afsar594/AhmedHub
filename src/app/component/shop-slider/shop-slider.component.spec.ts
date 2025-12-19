import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSliderComponent } from './shop-slider.component';

describe('ShopSliderComponent', () => {
  let component: ShopSliderComponent;
  let fixture: ComponentFixture<ShopSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
