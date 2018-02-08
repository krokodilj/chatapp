import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatboxComponent } from './chatbox/chatbox.component'
import { RegisterComponent } from './register/register.component'
import { CanActivateIfGuest } from './shared/guards/CanActivateIfGuest'
import { CanActivateIfUser } from './shared/guards/CanActivateIfUser'

const routes: Routes = [
{ path: '',  pathMatch:'full', redirectTo: '/login' },
{ path: 'login' , component: LoginComponent , canActivate: [CanActivateIfGuest]},
{ path: 'chat' , component: ChatboxComponent , canActivate: [CanActivateIfUser]},
{ path: 'register' , component: RegisterComponent , canActivate: [CanActivateIfGuest]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [ LoginComponent , RegisterComponent , ChatboxComponent]
}
