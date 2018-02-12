import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "../shared/user.service";
import { SessionService } from "../shared/session.service";

@Component({
  selector: "app-rooms",
  template: `
    <mat-list>
      <mat-list-item *ngFor="let m of rooms" (click) = "switch(m)">
          <span>{{m.id}} : </span>
          <span>{{m.name}}</span>
      </mat-list-item>
    </mat-list>
  `,
  styles: []
})
export class RoomsComponent implements OnInit {
  @Output() change = new EventEmitter<any>();

  rooms = [];

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.userService.getUserRooms(this.sessionService.data.id).then(val => {
      console.log(val);
      this.rooms = val;
    });
  }

  switch(e) {
    this.change.emit(e);
  }
}
