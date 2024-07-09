import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDocumentModalUploadComponent } from './user-document-modal-upload.component';

describe('UserDocumentModalUploadComponent', () => {
  let component: UserDocumentModalUploadComponent;
  let fixture: ComponentFixture<UserDocumentModalUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDocumentModalUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDocumentModalUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
