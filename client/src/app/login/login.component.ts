import { Component, OnInit } from "@angular/core";
import { WebSocketService } from "../shared/websocket.service";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";
import { User } from "../_model/user";
import { AuthService } from "../shared/auth.service";
import { AlertMessageService } from "../shared/alertmessage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private loginData: User = new User();
  private error = {
    message: "login error",
    hidden: true
  };

  constructor(
    private authService: AuthService,
    private ws: WebSocketService,
    private alertMsgService: AlertMessageService,
    private router: Router
  ) {}

  private login(loginData: User): void {
    this.authService
      .authenticate(loginData)
      .then(val => {
        this.router.navigate(["/chat"]);
      })
      .catch(val => {
        this.alertMsgService.showMessage(val._body);
      });
  }

  ngOnInit() {}
}
