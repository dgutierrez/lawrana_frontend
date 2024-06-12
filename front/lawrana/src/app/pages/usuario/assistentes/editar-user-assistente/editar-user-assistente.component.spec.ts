import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUserAssistenteComponent } from './editar-user-assistente.component';

describe('EditarUserAssistenteComponent', () => {
  let component: EditarUserAssistenteComponent;
  let fixture: ComponentFixture<EditarUserAssistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarUserAssistenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarUserAssistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
