import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import { WebSocketService } from "../../shared/websocket.service";
import { Subject } from "rxjs/Subject";
import { MessageService } from "../../shared/message.service";
import { ScrollEvent } from "ngx-scroll-event";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.css"]
})
export class ChatboxComponent implements OnInit, OnChanges {
  @Input() selectedRoom;
  @ViewChild("messagebox") messagebox: ElementRef;
  message: String = "";
  messages = [];
  page = 0;
  scrollEventHandleInProgress = false;

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

  constructor(
    private ws: WebSocketService,
    private messageService: MessageService
  ) {}

  handleScroll(event) {
    if (event.isReachingBottom && !this.scrollEventHandleInProgress) {
      this.scrollEventHandleInProgress = true;
      this.messageService
        .getRoomMessages(this.selectedRoom.id, this.page)
        .then(val => {
          this.messages = this.messages.concat(val.json());
          this.page++;
          this.scrollEventHandleInProgress = false;
        });
    }
  }

  ngOnInit() {
    this.ws.$messaages.subscribe(this.subscription.onNext);
  }

  ngOnChanges(changes) {
    let prev = changes.selectedRoom.previousValue;
    let curr = changes.selectedRoom.currentValue;
    if (prev && curr.id) {
      this.page = 0;
      this.messageService.getRoomMessages(curr.id, this.page).then(val => {
        this.messages = val.json();
        this.page++;
      });
    }
  }

  private subscription = {
    onNext: (msgEvt: any): void => {
      let data = JSON.parse(msgEvt.data);
      if (data.toId == this.selectedRoom.id) {
        this.messagebox.nativeElement.scrollTop = 0;
        this.messages.unshift(data);
      }
    }
  };
}
