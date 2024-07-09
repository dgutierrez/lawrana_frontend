import { Mensagem } from './../../../../interfaces/mensagem';
import { Component, Input, NgModule, OnInit, AfterViewInit, ElementRef, ViewChild, Output } from '@angular/core';
import { Chat } from '../../../../interfaces/chat';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../core/services/chat.service';
import { FormsModule } from '@angular/forms';
import * as Prism from 'prismjs';
import { CodeChatComponent } from '../code-chat/code-chat.component';
import { exibeNovaMensagenTrigger } from '../../../../animations/chat-animations';
import { EventEmitter } from 'stream';
import { Subject } from 'rxjs';
import { ModalExclusaoComponent } from '../../../../shared/modal-exclusao/modal-exclusao.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from '../../../../core/services/notificacao.service';
import { ChatSpinnerComponent } from '../chat-spinner/chat-spinner.component';
import { DocumentChatComponent } from '../document-chat/document-chat.component';

export type ChatItem = {
  icon: string;
  label: string;
  route: string;
  data: string;
}


@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, NgFor, CommonModule, FormsModule, CodeChatComponent, ChatSpinnerComponent, DocumentChatComponent],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss',
  animations: [exibeNovaMensagenTrigger]
})
export class UserChatComponent implements OnInit, AfterViewInit {
  chat: Chat = {
    codigo_chat: '',
    codigo_assistente: '',
    criado_em: '',
    foto_assistente: '',
    nome_chat: '',
    nome_assistente: ''
  }

  chatId: string = ''
  mensagens: Mensagem[] = []

  mensagem: string = ''
  msgRecebida: string = ''
  language: string = 'javascript'; // Define um padrão, pode ser alterado conforme necessário
  highlightedCode!: string;
  shouldScroll = false;
  isLoading: boolean = false;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private el: ElementRef,
    private dialog: MatDialog,
    private notificador: NotificacaoService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chatId = params['id'];
      this.carregarChat(this.chatId);
    });
  }

  carregarChat(id: string){
    //const id = this.route.snapshot.paramMap.get('id')

    console.log('buscando id de chat: ' + id)

    this.chatService.buscarChat(id!).subscribe((response: Chat) => {
      this.chat = response
      this.mensagens = response.mensagens!
    })
  }

  newMessage: string = '';

  sendMessage() {

    if (!this.chat.mensagens) {
      this.chat.mensagens = [];
    }

    let agora = new Date();

    let novaMsg: Mensagem = {
      codigo_mensagem: '1',
      data_mensagem: agora.toISOString(),
      mensagem: this.mensagem,
      tipo_mensagem: 'Usuario',
      nome_documento: '',
      extensao_documento: ''
    }

    this.chat.mensagens!.push(novaMsg);
    this.isLoading = true;
    this.shouldScroll = true;


    this.chatService.enviarMensagem(this.chat.codigo_chat!, this.mensagem).subscribe({
      next: (value : Mensagem) => {
        console.log('mensagem criada', value);
        //value.mensagem = this.ngAfterViewInit2(value.mensagem);
        this.chat.mensagens!.push(value)
        this.isLoading = false;
        this.shouldScroll = true;
      },
      error: (err) => {
        var msgErros = err.error.erros;
        console.log(msgErros);
        this.notificador.exibirNotificacao(msgErros[0], 'Fechar', 'error');
        this.isLoading = false;
      }
    });
    this.mensagem = ''
  }

  deletarChat(idChat: string) {
    const dialogRef = this.dialog.open(ModalExclusaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Código para excluir o item
        console.log('Usuário confirmou a exclusão');
        this.chatService.deletarChat(idChat).subscribe((r) => {
          this.router.navigate([`usuario/chats/`]);
        })
      } else {
        console.log('Usuário cancelou a exclusão');
      }
    });
  }

  buscarChat(){

  }

  ngAfterViewInit2(msg: string): string {
    this.highlightedCode = Prism.highlight(msg, Prism.languages[this.language], this.language);
    return this.highlightedCode;
  }

  ngAfterViewInit() {
    console.log('passei no ngAfterViewInit')
    this.highlightedCode = Prism.highlight(this.msgRecebida, Prism.languages[this.language], this.language);
    this.scrollToBottom();
  }

  isCodeMessage(message: string): boolean {
    // Defina aqui sua lógica para identificar mensagens que são blocos de código.
    // Um exemplo simples seria verificar se a mensagem contém a tag <code>.
    return message.includes('<code>') || message.includes('```');
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  copyCode(msg: string) {
    const textarea = document.createElement('textarea');
    textarea.value = msg;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Código copiado para a área de transferência!');
  }

}
