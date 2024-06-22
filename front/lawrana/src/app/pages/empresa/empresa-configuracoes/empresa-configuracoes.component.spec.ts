import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaConfiguracoesComponent } from './empresa-configuracoes.component';

describe('EmpresaConfiguracoesComponent', () => {
  let component: EmpresaConfiguracoesComponent;
  let fixture: ComponentFixture<EmpresaConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaConfiguracoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpresaConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
