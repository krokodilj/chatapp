import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<app-header></app-header>
            <app-alertmessage></app-alertmessage>
            <router-outlet></router-outlet>`
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
