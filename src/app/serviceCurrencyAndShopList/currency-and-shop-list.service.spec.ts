import { TestBed } from '@angular/core/testing';

import { CurrencyAndShopListService } from './currency-and-shop-list.service';

describe('CurrencyAndShopListService', () => {
  let service: CurrencyAndShopListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyAndShopListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
