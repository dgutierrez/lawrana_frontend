import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-spinner',
  standalone: true,
  imports: [],
  templateUrl: './chat-spinner.component.html',
  styleUrl: './chat-spinner.component.css'
})
export class ChatSpinnerComponent {
  @Input() foto_assistente!: string | ArrayBuffer | null;
}
