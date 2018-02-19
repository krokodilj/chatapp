import { Injectable } from "@angular/core";
import { Observable, Observer, BehaviorSubject, Subject } from "rxjs";
import { SessionService } from "./session.service";
import { AlertMessageService } from "./alertmessage.service";

@Injectable()
export class WebSocketService {
  public $connection: BehaviorSubject<Boolean>;
  public $notifications: Subject<Notification>;
  public $messaages: Subject<String>;
  private socket: WebSocket;
  private url = "ws://localhost:3001";

  connect() {
    this.socket = new WebSocket(
      this.url + `/?token=${this.sessionService.data.token}`
    );

    this.socket.onopen = this.onOpen.bind(this);

    this.socket.onmessage = this.onMessage.bind(this);

    this.socket.onerror = this.onError.bind(this);

    this.socket.onclose = this.onClose.bind(this);
  }

  disconnect() {
    this.socket.close();
    this.socket = null;
  }

  send(data) {
    if (this.socket && this.socket.readyState == 1) this.socket.send(data);
  }

  private onOpen() {
    this.$connection.next(true);
  }

  private onMessage(data) {
    //DELETE
    this.$messaages.next(data);
    //TODO parse message and .next subjects
  }

  private onError() {
    this.alertMsgService.showMessage("Connection Error");
  }

  private onClose() {
    this.$connection.next(false);
  }

  constructor(
    private sessionService: SessionService,
    private alertMsgService: AlertMessageService
  ) {
    this.$connection = new BehaviorSubject(false);
    this.$messaages = new Subject();
  }
}
