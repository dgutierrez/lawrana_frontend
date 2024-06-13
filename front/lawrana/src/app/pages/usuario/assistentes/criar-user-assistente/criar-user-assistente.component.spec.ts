import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarUserAssistenteComponent } from './criar-user-assistente.component';

describe('CriarUserAssistenteComponent', () => {
  let component: CriarUserAssistenteComponent;
  let fixture: ComponentFixture<CriarUserAssistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarUserAssistenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarUserAssistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
