import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { WebSocketService } from "../shared/websocket.service";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.css"]
})
export class ChatboxComponent implements OnInit, OnChanges {
  @Input() selectedRoom;
  message: String;
  messages = [];
  socket: Subject<any>;
  error = false;
  private s;

  private send(message: String): void {
    this.ws.send(
      JSON.stringify({
        type: "message",
        to: "room",
        toId: this.selectedRoom.id,
        text: message
      })
    );
  }

  constructor(private ws: WebSocketService) {}

  ngOnInit() {
    this.ws.$messaages.subscribe(this.subscription.onNext);
  }

  ngOnChanges(changes) {
    //TODO reload chatbox
    //pull last n messages from server
    //and then subscribe
  }

  private subscription = {
    onNext: (msgEvt: any): void => {
      let data = JSON.parse(msgEvt.data);
      if (data.toId == this.selectedRoom.id) this.messages.unshift(data);
    }
  };
}
