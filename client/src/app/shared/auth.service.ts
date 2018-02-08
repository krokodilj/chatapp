import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { User } from "../_model/user";
import { SessionService } from "./session.service";

@Injectable()
export class AuthService {
  headers = new Headers({ "Content-Type": "application/json" });

  constructor(private http: Http, private sessionService: SessionService) {}

  authenticate(user: User): Promise<String> {
    let data = JSON.stringify(user);
    return this.http
      .post("/api/user/login", data, { headers: this.headers })
      .toPromise()
      .then((val: Response) => {
        this.sessionService.createSession(val.json());
        return val.json();
      });
  }

  logOut() {
    this.sessionService.destroySesison();
  }

  isAuthenticated() {
    return this.sessionService.data.token != null;
  }
}
