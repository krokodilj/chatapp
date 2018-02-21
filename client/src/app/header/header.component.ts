import { Component, OnInit, Input } from "@angular/core";
import { SessionService } from "../shared/auth/session.service";
import { WebSocketService } from "../shared/websocket.service";
import { AuthService } from "../shared/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Input() sidenav;

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private ws: WebSocketService,
    private router: Router
  ) {}

  ngOnInit() {}

  change() {
    if (this.ws.$connection.getValue()) this.ws.disconnect();
    else this.ws.connect();
  }

  logout() {
    this.authService.logOut();
    if (this.ws.$connection.getValue()) this.ws.disconnect();
    this.router.navigate(["/login"]);
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  home() {
    this.router.navigate(["/home"]);
  }
}
