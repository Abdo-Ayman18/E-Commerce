import { TestBed } from '@angular/core/testing';

import { WashlistService } from './washlist.service';

describe('WashlistService', () => {
  let service: WashlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WashlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
