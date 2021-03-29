import {TestBed} from '@angular/core/testing';

import {MemoryListService} from './memory-list.service';

describe('MemoryListService', () => {
  let service: MemoryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
