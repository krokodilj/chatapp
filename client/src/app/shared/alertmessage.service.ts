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

  showResponseMessage(message) {
    if (message.status == 400) {
      this.message = "";
      for (let field of JSON.parse(message._body)) {
        this.message += "- " + field.messages + "\n";
      }
    } else {
      this.message = message._body;
    }
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }
}
