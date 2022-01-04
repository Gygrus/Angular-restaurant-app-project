import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistComponent } from './order-hist.component';

describe('OrderHistComponent', () => {
  let component: OrderHistComponent;
  let fixture: ComponentFixture<OrderHistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
