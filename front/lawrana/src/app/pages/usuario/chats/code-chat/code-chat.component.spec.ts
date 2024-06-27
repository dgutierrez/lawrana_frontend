import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeChatComponent } from './code-chat.component';

describe('CodeChatComponent', () => {
  let component: CodeChatComponent;
  let fixture: ComponentFixture<CodeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
