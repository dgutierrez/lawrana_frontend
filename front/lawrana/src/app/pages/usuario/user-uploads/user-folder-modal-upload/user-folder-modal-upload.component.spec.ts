import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFolderModalUploadComponent } from './user-folder-modal-upload.component';

describe('UserFolderModalUploadComponent', () => {
  let component: UserFolderModalUploadComponent;
  let fixture: ComponentFixture<UserFolderModalUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFolderModalUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFolderModalUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
