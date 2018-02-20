import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaterialModule } from "./material.module";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { WebSocketService } from "./shared/websocket.service";
import { UserService } from "./shared/user.service";
import { SessionService } from "./shared/session.service";
import { AuthService } from "./shared/auth.service";
import { MessageService } from "./shared/message.service";
import { RoomService } from "./shared/room.service";

import { HandleHttpResponseService } from "./shared/util/handleHttpResponse.service";
import { AlertMessageService } from "./shared/util/alertmessage.service";

import { CanActivateIfGuest } from "./shared/guards/CanActivateIfGuest";
import { CanActivateIfUser } from "./shared/guards/CanActivateIfUser";

import { LoginComponent } from "./login/login.component";
import { ChatboxComponent } from "./home/chatbox/chatbox.component";
import { HeaderComponent } from "./header/header.component";
import { RegisterComponent } from "./register/register.component";
import { AlertmessageComponent } from "./alertmessage/alertmessage.component";
import { HomeComponent } from "./home/home.component";
import { ChannelsComponent } from "./home/channels/channels.component";
import { ScrollEventModule } from "ngx-scroll-event";
import { RoomsComponent } from "./rooms/rooms.component";
import { CreateRoomComponent } from "./createRoom/createRoom.component";
import { RoomRequestServiceService } from "./shared/roomRequest.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    ScrollEventModule
  ],
  declarations: [
    AppComponent,
    AppRoutingModule.components,
    HeaderComponent,
    AlertmessageComponent,
    HomeComponent,
    ChannelsComponent,
    ChatboxComponent,
    RoomsComponent,
    CreateRoomComponent
  ],
  providers: [
    WebSocketService,
    UserService,
    SessionService,
    AuthService,
    AlertMessageService,
    MessageService,
    RoomService,
    HandleHttpResponseService,
    CanActivateIfGuest,
    CanActivateIfUser,
    RoomRequestServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private sessionService: SessionService) {
    sessionService.activate();
  }
}
