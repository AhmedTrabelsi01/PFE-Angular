import { TestBed } from '@angular/core/testing';

import { MentorDataService } from './mentor-data.service';

describe('MentorDataService', () => {
  let service: MentorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
