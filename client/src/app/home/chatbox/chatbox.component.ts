import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { WebSocketService } from "../../shared/websocket.service";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.css"]
})
export class ChatboxComponent implements OnInit, OnChanges {
  @Input() selectedRoom;
  message: String = "";
  messages = [];

  persist = {};

  private send(message: String): void {
    if (this.message.length != 0 && this.selectedRoom.id) {
      this.ws.send(
        JSON.stringify({
          type: "message",
          to: "room",
          toId: this.selectedRoom.id,
          text: message
        })
      );
      this.message = "";
    }
  }

  constructor(private ws: WebSocketService) {}

  ngOnInit() {
    this.ws.$messaages.subscribe(this.subscription.onNext);
  }

  ngOnChanges(changes) {
    console.log(changes);
    let prev = changes.selectedRoom.previousValue;
    let curr = changes.selectedRoom.currentValue;
    if (prev)
      if (prev.id && curr.id) {
        this.persist[prev.id] = this.messages;
        this.messages = this.persist[curr.id] ? this.persist[curr.id] : [];
      }
  }

  private subscription = {
    onNext: (msgEvt: any): void => {
      let data = JSON.parse(msgEvt.data);
      if (data.toId == this.selectedRoom.id) this.messages.unshift(data);
      else {
        if (Object.keys(this.persist).includes(String(data.toId)))
          this.persist[data.toId].unshift(data);
      }
    }
  };
}
