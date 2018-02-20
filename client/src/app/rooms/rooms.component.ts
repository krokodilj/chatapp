import { Component, OnInit } from "@angular/core";
import { RoomService } from "../shared/room.service";
import { Room } from "../model/Room";
import { AlertMessageService } from "../shared/util/alertmessage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.css"]
})
export class RoomsComponent implements OnInit {
  private rooms;

  constructor(
    private roomService: RoomService,
    private alertMessageService: AlertMessageService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.rooms = await this.roomService.getAll();
  }

  async join(room) {
    try {
      if (room.closed) {
        //TODO request to room
        this.alertMessageService.showMessage("not implemented");
      } else {
        await this.roomService.joinRoom(room.id);
        this.alertMessageService.showMessage("succesfully joined");
        this.router.navigate(["/home"]);
      }
    } catch (err) {
      this.alertMessageService.showResponseMessage(err);
    }
  }
}
