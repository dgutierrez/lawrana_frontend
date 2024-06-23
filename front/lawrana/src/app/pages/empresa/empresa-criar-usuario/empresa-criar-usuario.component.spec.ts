import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaCriarUsuarioComponent } from './empresa-criar-usuario.component';

describe('EmpresaCriarUsuarioComponent', () => {
  let component: EmpresaCriarUsuarioComponent;
  let fixture: ComponentFixture<EmpresaCriarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaCriarUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpresaCriarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
