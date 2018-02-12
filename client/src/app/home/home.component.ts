import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <div layout="row">
      <app-rooms flex (change)="roomChange($event)" ></app-rooms>
      <app-chatbox flex [selectedRoom]="sharedData"></app-chatbox>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  sharedData = {};

  roomChange(event) {
    this.sharedData = event;
  }
  constructor() {}

  ngOnInit() {}
}
