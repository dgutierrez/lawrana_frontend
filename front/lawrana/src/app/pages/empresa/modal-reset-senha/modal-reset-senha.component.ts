import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-reset-senha',
  standalone: true,
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './modal-reset-senha.component.html',
  styleUrl: './modal-reset-senha.component.css'
})
export class ModalResetSenhaComponent {
  constructor(public dialogRef: MatDialogRef<ModalResetSenhaComponent>) {

  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
