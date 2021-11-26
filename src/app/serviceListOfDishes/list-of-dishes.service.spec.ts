import { TestBed } from '@angular/core/testing';

import { ListOfDishesService } from './list-of-dishes.service';

describe('ListOfDishesService', () => {
  let service: ListOfDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
