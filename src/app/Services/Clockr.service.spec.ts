/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClockrService } from './Clockr.service';

describe('Service: Clockr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClockrService]
    });
  });

  it('should ...', inject([ClockrService], (service: ClockrService) => {
    expect(service).toBeTruthy();
  }));
});
