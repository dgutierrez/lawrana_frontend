import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notificacao',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf],
  templateUrl: './notificacao.component.html',
  styleUrl: './notificacao.component.css'
})
export class NotificacaoComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<NotificacaoComponent>) {

  }

  ngOnInit(): void {

  }
}
