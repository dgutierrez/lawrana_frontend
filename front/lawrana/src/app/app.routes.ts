import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmpLoginComponent } from './pages/empresa/emp-login/emp-login.component';
import { EmpHomeComponent } from './pages/empresa/emp-home/emp-home.component';
import { UserLoginComponent } from './pages/usuario/user-login/user-login.component';
import { UserHomeComponent } from './pages/usuario/user-home/user-home.component';
import { UserChatComponent } from './pages/usuario/chats/user-chat/user-chat.component';
import { ListarUserAssistenteComponent } from './pages/usuario/assistentes/listar-user-assistente/listar-user-assistente.component';
import { EditarUserAssistenteComponent } from './pages/usuario/assistentes/editar-user-assistente/editar-user-assistente.component';
import { CriarUserAssistenteComponent } from './pages/usuario/assistentes/criar-user-assistente/criar-user-assistente.component';
import { NavigatorUserChatComponent } from './pages/usuario/chats/navigator-user-chat/navigator-user-chat.component';
import { authGuard } from './core/guards/auth.guard';
import { empAuthGuard } from './core/guards/empAuth.guard';
import { EmpresaPerfilComponent } from './pages/empresa/empresa-perfil/empresa-perfil.component';

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
    component: EmpHomeComponent,
    canActivate: [empAuthGuard],
    children: [
      {
        path: 'perfil',
        component: EmpresaPerfilComponent,
        canActivate: [empAuthGuard]
      }
    ]
  },
  {
    path: 'usuario/login',
    component: UserLoginComponent
  },
  {
    path: 'usuario',
    component: UserHomeComponent,
    canActivate: [authGuard],
    children: [
      { path: 'chats',
        component: NavigatorUserChatComponent,
        canActivate: [authGuard],
        children: [
          { path: 'chat/:id',
            component: UserChatComponent,
            canActivate: [authGuard] }
        ]
      },

      { path: 'assistentes', component: ListarUserAssistenteComponent, canActivate: [authGuard] },
      { path: 'assistentes/editarAssistente/:id', component: EditarUserAssistenteComponent, canActivate: [authGuard] },
      { path: 'assistentes/criarAssistente', component: CriarUserAssistenteComponent, canActivate: [authGuard] },
    ]
  }
];
