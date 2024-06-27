import { AfterViewInit, Component, ElementRef, Input, OnChanges } from '@angular/core';
import * as Prism from 'prismjs';

@Component({
  selector: 'app-code-chat',
  standalone: true,
  imports: [],
  templateUrl: './code-chat.component.html',
  styleUrl: './code-chat.component.css'
})
export class CodeChatComponent implements OnChanges  {
  @Input() code!: string;
  @Input() language: string = 'javascript'; // Define um padrão, pode ser alterado conforme necessário
  highlightedCode!: string;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.highlightedCode = Prism.highlight(this.code, Prism.languages[this.language], this.language);
  }

  ngAfterViewInit() {
    this.highlightedCode = Prism.highlight(this.code, Prism.languages[this.language], this.language);
  }
}
