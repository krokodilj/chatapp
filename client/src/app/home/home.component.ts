import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
  <div class="flex-container" fxLayout="row">
      <app-rooms  fxFlex="40" (change)="roomChange($event)" [selectedRoom]="sharedData" ></app-rooms>
      <app-chatbox  fxFlex="60" [selectedRoom]="sharedData"></app-chatbox>
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
