import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaUsuariosComponent } from './empresa-usuarios.component';

describe('EmpresaUsuariosComponent', () => {
  let component: EmpresaUsuariosComponent;
  let fixture: ComponentFixture<EmpresaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpresaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
