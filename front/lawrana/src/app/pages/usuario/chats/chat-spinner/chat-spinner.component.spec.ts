import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSpinnerComponent } from './chat-spinner.component';

describe('ChatSpinnerComponent', () => {
  let component: ChatSpinnerComponent;
  let fixture: ComponentFixture<ChatSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
