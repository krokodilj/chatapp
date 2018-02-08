import { Injectable } from "@angular/core";

@Injectable()
export class AlertMessageService {
  private _hidden: Boolean = true;
  private _message: String;

  get hidden() {
    return this._hidden;
  }

  set hidden(hidden: Boolean) {
    this._hidden = hidden;
  }

  get message() {
    return this._message;
  }

  set message(message: String) {
    this._message = message;
  }

  constructor() {}

  showMessage(message: String) {
    this.message = message;
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }
}
