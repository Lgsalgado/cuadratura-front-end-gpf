import { TestBed } from '@angular/core/testing';

import { SalesforceomsService } from './salesforceoms.service';

describe('SalesforceomsService', () => {
  let service: SalesforceomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesforceomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
