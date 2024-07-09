import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDocumentUploadComponent } from './user-document-upload.component';

describe('UserDocumentUploadComponent', () => {
  let component: UserDocumentUploadComponent;
  let fixture: ComponentFixture<UserDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDocumentUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
