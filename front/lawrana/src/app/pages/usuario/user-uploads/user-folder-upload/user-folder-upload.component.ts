import { Component, Input } from '@angular/core';
import { Diretorio } from '../../../../interfaces/diretorio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-folder-upload',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterModule],
  templateUrl: './user-folder-upload.component.html',
  styleUrl: './user-folder-upload.component.css'
})
export class UserFolderUploadComponent {
  @Input() diretorio!: Diretorio
}
