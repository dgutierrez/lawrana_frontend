import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUserChatComponent } from './listar-user-chat.component';

describe('ListarUserChatComponent', () => {
  let component: ListarUserChatComponent;
  let fixture: ComponentFixture<ListarUserChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarUserChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarUserChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
