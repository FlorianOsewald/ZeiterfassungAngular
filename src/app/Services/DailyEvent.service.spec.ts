/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DailyEventService } from './DailyEvent.service';

describe('Service: DailyEvent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyEventService]
    });
  });

  it('should ...', inject([DailyEventService], (service: DailyEventService) => {
    expect(service).toBeTruthy();
  }));
});
