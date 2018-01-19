import { TestBed, inject } from '@angular/core/testing';

import { IssueInfoService } from './issue-info.service';

describe('IssueInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueInfoService]
    });
  });

  it('should be created', inject([IssueInfoService], (service: IssueInfoService) => {
    expect(service).toBeTruthy();
  }));
});
