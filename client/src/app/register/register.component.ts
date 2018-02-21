import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { AuthService } from "../shared/auth/auth.service";
import { User } from "../model/user";
import { Router } from "@angular/router";
import { AlertMessageService } from "../shared/util/alertmessage.service";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  private user: User = new User();
  private step: Number = 1;
  private id: Number;
  private fileList = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertMsgService: AlertMessageService,
    private router: Router,
    private http: Http
  ) {}

  ngOnInit() {}

  async register(user: User) {
    try {
      let id = await this.userService.create(this.user);
      this.step = 2;
      this.id = id;
    } catch (err) {
      this.alertMsgService.showResponseMessage(err);
    }
  }

  async upload() {
    try {
      let file: File = this.fileList[0];
      await this.userService.uploadUserAvatar(this.id, file);
      this.finish();
    } catch (err) {
      this.alertMsgService.showResponseMessage(err);
    }
  }

  async finish() {
    try {
      await this.authService.authenticate(this.user);
      this.router.navigate(["/home"]);
    } catch (err) {
      this.alertMsgService.showResponseMessage(err);
    }
  }

  private fileChanged(event) {
    this.fileList = event.target.files;
  }
}
