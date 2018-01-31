import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatboxComponent } from './chatbox/chatbox.component'

const routes: Routes = [
{ path: '',  pathMatch:'full', redirectTo: '/login' },
{ path: 'login' , component: LoginComponent },
{ path: 'chat' , component: ChatboxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [ LoginComponent ];
}
