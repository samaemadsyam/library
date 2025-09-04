import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductApiComponent } from './product-api-component';

describe('ProductApiComponent', () => {
  let component: ProductApiComponent;
  let fixture: ComponentFixture<ProductApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
