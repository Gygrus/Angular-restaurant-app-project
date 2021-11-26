import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDishesComponent } from './filter-dishes.component';

describe('FilterDishesComponent', () => {
  let component: FilterDishesComponent;
  let fixture: ComponentFixture<FilterDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
