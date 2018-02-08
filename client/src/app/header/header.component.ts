import { Component, OnInit } from "@angular/core";
import { SessionService } from "../shared/session.service";
import { WebSocketService } from "../shared/websocket.service";
import { AuthService } from "../shared/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private ws: WebSocketService
  ) {}

  ngOnInit() {}

  change() {
    if (this.ws.$isConnected.getValue()) this.ws.disconnect();
    else this.ws.connect();
  }

  logout() {
    this.authService.logOut();
    this.ws.disconnect();
  }
}
