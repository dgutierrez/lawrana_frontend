import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssistantesComponent } from './user-assistantes.component';

describe('UserAssistantesComponent', () => {
  let component: UserAssistantesComponent;
  let fixture: ComponentFixture<UserAssistantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAssistantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAssistantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
