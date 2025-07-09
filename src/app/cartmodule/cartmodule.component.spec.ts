import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartmoduleComponent } from './cartmodule.component';

describe('CartmoduleComponent', () => {
  let component: CartmoduleComponent;
  let fixture: ComponentFixture<CartmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartmoduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
