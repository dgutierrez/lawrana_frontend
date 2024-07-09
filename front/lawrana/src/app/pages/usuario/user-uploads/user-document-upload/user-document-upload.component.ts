import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { Documento } from '../../../../interfaces/diretorio';

@Component({
  selector: 'app-user-document-upload',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterModule],
  templateUrl: './user-document-upload.component.html',
  styleUrl: './user-document-upload.component.css'
})
export class UserDocumentUploadComponent {
  @Input() documento!: Documento;
}
