import { Component, OnInit } from "@angular/core";
import { RoomService } from "../shared/room.service";
import { Room } from "../model/Room";
import { Router } from "@angular/router";
import { AlertMessageService } from "../shared/util/alertmessage.service";
@Component({
  selector: "app-create-room",
  templateUrl: "./createRoom.component.html",
  styleUrls: ["./createRoom.component.css"]
})
export class CreateRoomComponent implements OnInit {
  room: Room = new Room();

  constructor(
    private roomService: RoomService,
    private router: Router,
    private alertMessageService: AlertMessageService
  ) {}

  ngOnInit() {
    this.room.closed = false;
  }

  async create(room: Room) {
    try {
      let id = await this.roomService.create(room);
      this.router.navigate(["/home"]);
    } catch (err) {
      this.alertMessageService.showResponseMessage(err);
    }
  }
}
