import { Component, OnInit } from "@angular/core";
import { RoomService } from "../shared/room.service";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.css"]
})
export class RoomsComponent implements OnInit {
  constructor(private roomService: RoomService) {}

  private rooms;

  async ngOnInit() {
    this.rooms = await this.roomService.getAll();
  }
}
