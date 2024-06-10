import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUserAssistenteComponent } from './listar-user-assistente.component';

describe('ListarUserAssistenteComponent', () => {
  let component: ListarUserAssistenteComponent;
  let fixture: ComponentFixture<ListarUserAssistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarUserAssistenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarUserAssistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
