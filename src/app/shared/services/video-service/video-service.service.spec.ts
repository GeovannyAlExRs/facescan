import { TestBed } from '@angular/core/testing';

import { VideoServices } from './video-service.service';

describe('VideoServiceService', () => {
  let service: VideoServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
