import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFolderUploadComponent } from './user-folder-upload.component';

describe('UserFolderUploadComponent', () => {
  let component: UserFolderUploadComponent;
  let fixture: ComponentFixture<UserFolderUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFolderUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFolderUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
