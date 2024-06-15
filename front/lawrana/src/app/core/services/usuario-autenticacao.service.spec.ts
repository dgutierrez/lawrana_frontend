import { TestBed } from '@angular/core/testing';

import { UsuarioAutenticacaoService } from './usuario-autenticacao.service';

describe('UsuarioAutenticacaoService', () => {
  let service: UsuarioAutenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioAutenticacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
