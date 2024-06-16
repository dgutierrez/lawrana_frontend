import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-exclusao',
  standalone: true,
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './modal-exclusao.component.html',
  styleUrl: './modal-exclusao.component.css'
})
export class ModalExclusaoComponent {
  constructor(public dialogRef: MatDialogRef<ModalExclusaoComponent>) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
