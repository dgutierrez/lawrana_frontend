import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuSidenavComponent } from './meu-sidenav.component';

describe('MeuSidenavComponent', () => {
  let component: MeuSidenavComponent;
  let fixture: ComponentFixture<MeuSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeuSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
