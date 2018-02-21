import { Component, OnInit } from "@angular/core";
import { WebSocketService } from "../shared/websocket.service";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";
import { User } from "../model/user";
import { AuthService } from "../shared/auth/auth.service";
import { AlertMessageService } from "../shared/util/alertmessage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private loginData: User = new User();

  constructor(
    private authService: AuthService,
    private alertMsgService: AlertMessageService,
    private router: Router
  ) {}

  async login(loginData: User) {
    try {
      await this.authService.authenticate(loginData);
      this.router.navigate(["/home"]);
    } catch (err) {
      this.alertMsgService.showResponseMessage(err);
    }
  }

  ngOnInit() {}
}
