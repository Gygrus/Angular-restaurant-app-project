import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesManagerComponent } from './dishes-manager.component';

describe('DishesManagerComponent', () => {
  let component: DishesManagerComponent;
  let fixture: ComponentFixture<DishesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
