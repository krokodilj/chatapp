import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { AuthService } from "../shared/auth.service";
import { User } from "../_model/user";
import { Router } from "@angular/router";
import { AlertMessageService } from "../shared/alertmessage.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: []
})
export class RegisterComponent implements OnInit {
  private user: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertMsgService: AlertMessageService,
    private router: Router
  ) {}

  ngOnInit() {}

  register(user: User) {
    this.userService
      .create(this.user)
      .then(val => {
        this.authService.authenticate(this.user).then(_ => {
          this.router.navigate(["/chat"]);
          this.user = new User();
        });
      })
      .catch(val => {
        this.alertMsgService.showResponseMessage(val);
      });
  }
}
