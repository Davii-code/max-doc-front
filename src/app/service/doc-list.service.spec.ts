import { TestBed } from '@angular/core/testing';

import { DocListService } from './doc-list.service';

describe('DocListService', () => {
  let service: DocListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
