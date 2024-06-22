import { TestBed } from '@angular/core/testing';

import { EmpresaAutenticacaoService } from './empresa-autenticacao.service';

describe('EmpresaAutenticacaoService', () => {
  let service: EmpresaAutenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaAutenticacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
