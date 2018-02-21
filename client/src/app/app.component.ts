import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
          <style>
            .example-container {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
            }
            .n{
              background-color : #1f5382;
              color: white;
              font-weight:bold;
            }
          </style>
          <mat-sidenav-container class="example-container" >
            <mat-sidenav fxLayout="column" class="n" mode="side" closed #sidenav>
              <br>
              <button mat-button routerLink="rooms">Rooms</button>
              <br>
              <button mat-button routerLink="create_room">Create Room</button>
            </mat-sidenav>
            <mat-sidenav-content style="height:100%">
              <app-header [sidenav]="sidenav"></app-header>
              <app-alertmessage></app-alertmessage>
              <router-outlet></router-outlet>
            </mat-sidenav-content>
          </mat-sidenav-container>
          `
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
