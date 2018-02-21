import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

@Injectable()
export class AlertMessageService {
  private hidden: Boolean = true;
  private message: String;

  constructor() {}

  showMessage(message: String) {
    this.message = message;
    this.hidden = false;
  }

  showResponseMessage(message) {
    try {
      this.message = message.json();
    } catch (e) {
      this.message = message._body;
    }
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }
}
