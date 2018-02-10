import { Component, OnInit } from "@angular/core";
import { WebSocketService } from "../shared/websocket.service";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.css"]
})
export class ChatboxComponent implements OnInit {
  message: String;
  messages = [];
  socket: Subject<any>;
  error = false;
  private s ;

  private send(message: String): void {
    this.ws.send(message)
  }

  constructor(private ws: WebSocketService) {}

  ngOnInit() {
    this.ws.$messaages.subscribe(this.subscription.onNext);
  }

  private subscription = {
    onNext: (msgEvt: any): void => {
      let data = JSON.parse(msgEvt.data);
      this.messages.unshift(data);
    }
  };
}
