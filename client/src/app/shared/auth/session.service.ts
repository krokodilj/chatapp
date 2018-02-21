import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { SessionData } from "../../model/sessionData";

@Injectable()
export class SessionService {
  private _data: SessionData = new SessionData();

  constructor() {}

  get data(): SessionData {
    return this._data;
  }

  createSession(token: string) {
    localStorage.setItem("chatapp-token", token);
    this._data.token = token;
    let data = this.parseJWT(token);
    this._data.id = data.id;
    this._data.username = data.username;
    this._data.avatar = data.avatar;
  }

  destroySesison() {
    localStorage.removeItem("chatapp-token");
    this._data = new SessionData();
  }

  activate() {
    console.log("session service activated");
    let token = localStorage.getItem("chatapp-token");
    if (token) {
      this._data.token = token;
      let data = this.parseJWT(token);
      this._data.id = data.id;
      this._data.username = data.username;
      this._data.avatar = data.avatar;
    }
  }

  private parseJWT(token: String) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
  }
}
