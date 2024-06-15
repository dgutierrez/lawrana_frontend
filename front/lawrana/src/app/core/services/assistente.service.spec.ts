import { TestBed } from '@angular/core/testing';

import { AssistenteService } from './assistente.service';

describe('AssistenteService', () => {
  let service: AssistenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
