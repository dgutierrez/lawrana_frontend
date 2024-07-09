import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-document-chat',
  standalone: true,
  imports: [],
  templateUrl: './document-chat.component.html',
  styleUrl: './document-chat.component.css'
})
export class DocumentChatComponent {
  @Input() fileName!:string
}
