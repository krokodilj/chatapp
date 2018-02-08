import { Component, OnInit } from "@angular/core";
import { AlertMessageService } from "../shared/alertmessage.service";

@Component({
  selector: "app-alertmessage",
  templateUrl: "./alertmessage.component.html",
  styles: []
})
export class AlertmessageComponent implements OnInit {
  constructor(private alertMsgService: AlertMessageService) {}

  ngOnInit() {}
}
