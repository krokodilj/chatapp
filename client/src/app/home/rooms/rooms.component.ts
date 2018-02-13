import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "../../shared/user.service";
import { SessionService } from "../../shared/session.service";
import { WebSocketService } from "../../shared/websocket.service";

@Component({
  selector: "app-rooms",
  template: `
    <mat-list>
      <mat-list-item *ngFor="let m of rooms" (click) = "switch(m)">
          <span>{{m.id}} : </span>
          <span>{{m.name}}</span>
          <span>{{m.br}}</span>
      </mat-list-item>
    </mat-list>
  `,
  styles: []
})
export class RoomsComponent implements OnInit {
  @Input() selectedRoom;
  @Output() change = new EventEmitter<any>();

  rooms = [];

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private ws: WebSocketService
  ) {}

  ngOnInit() {
    this.userService.getUserRooms(this.sessionService.data.id).then(val => {
      this.rooms = val;
    });
    this.ws.$messaages.subscribe((msgEvt: any): void => {
      let data = JSON.parse(msgEvt.data);
      if (data.toId && data.toId != this.selectedRoom.id) {
        let room = this.rooms.filter(e => e.id == data.toId);
        if (!room[0].br) room[0].br = 0;
        room[0].br++;
      }
    });
  }

  switch(e) {
    this.change.emit(e);
    let room = this.rooms.filter(d => d == e);
    room[0].br = null;
  }
}
