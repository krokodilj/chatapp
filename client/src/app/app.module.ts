import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { MaterialModule } from './material.module';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebSocketService } from './shared/websocket.service';
import { LoginComponent } from './login/login.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, AppRoutingModule , MaterialModule ],
  declarations: [ AppComponent, AppRoutingModule.components, LoginComponent, ChatboxComponent, HeaderComponent ],
  providers:    [ WebSocketService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }