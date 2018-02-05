import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { MaterialModule } from './material.module';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { WebSocketService } from './shared/websocket.service';
import { UserService } from './shared/user.service';
import { SessionService } from './shared/session.service';
import { AuthService } from './shared/auth.service';

import { LoginComponent } from './login/login.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, AppRoutingModule , MaterialModule ],
  declarations: [ AppComponent, AppRoutingModule.components, LoginComponent, ChatboxComponent, HeaderComponent, RegisterComponent ],
  providers:    [ WebSocketService , UserService , SessionService , AuthService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
  constructor (private sessionService: SessionService) {
    sessionService.activate();
  }
}