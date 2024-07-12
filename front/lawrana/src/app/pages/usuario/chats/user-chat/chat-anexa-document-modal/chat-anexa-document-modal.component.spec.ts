import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAnexaDocumentModalComponent } from './chat-anexa-document-modal.component';

describe('ChatAnexaDocumentModalComponent', () => {
  let component: ChatAnexaDocumentModalComponent;
  let fixture: ComponentFixture<ChatAnexaDocumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAnexaDocumentModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatAnexaDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
