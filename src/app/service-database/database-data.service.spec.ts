import { TestBed } from '@angular/core/testing';

import { DatabaseDataService } from './database-data.service';

describe('DatabaseDataService', () => {
  let service: DatabaseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
