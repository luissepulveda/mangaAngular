import { TestBed } from '@angular/core/testing';

import { MangaDataService } from './manga-data.service';

describe('MangaDataService', () => {
  let service: MangaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
