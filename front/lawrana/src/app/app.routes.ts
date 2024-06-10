import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmpLoginComponent } from './pages/empresa/emp-login/emp-login.component';
import { EmpHomeComponent } from './pages/empresa/emp-home/emp-home.component';
import { UserLoginComponent } from './pages/usuario/user-login/user-login.component';
import { UserHomeComponent } from './pages/usuario/user-home/user-home.component';
import { UserChatComponent } from './pages/usuario/user-chat/user-chat.component';
import { UserAssistantesComponent } from './pages/usuario/user-assistantes/user-assistantes.component';
import { ListarUserAssistenteComponent } from './pages/usuario/assistentes/listar-user-assistente/listar-user-assistente.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'empresa/login',
    component: EmpLoginComponent
  },
  {
    path: 'empresa',
    component: EmpHomeComponent
  },
  {
    path: 'usuario/login',
    component: UserLoginComponent
  },
  {
    path: 'usuario',
    component: UserHomeComponent,
    children: [
      { path: 'chats', component: UserChatComponent },
      { path: 'assistentes', component: ListarUserAssistenteComponent },
    ]
  }
];