import { TestBed } from '@angular/core/testing';

import { ToShareService } from './to-share.service';

describe('ToShareService', () => {
  let service: ToShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
