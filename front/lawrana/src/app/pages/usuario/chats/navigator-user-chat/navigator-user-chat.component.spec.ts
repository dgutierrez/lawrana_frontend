import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorUserChatComponent } from './navigator-user-chat.component';

describe('NavigatorUserChatComponent', () => {
  let component: NavigatorUserChatComponent;
  let fixture: ComponentFixture<NavigatorUserChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigatorUserChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigatorUserChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
