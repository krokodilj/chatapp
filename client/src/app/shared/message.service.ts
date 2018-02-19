import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { SessionData } from "../_model/sessionData";
import { Http } from "@angular/http";

@Injectable()
export class MessageService {
  constructor(private http: Http) {}

  getRoomMessages(id: Number, page: Number): Promise<any> {
    return this.http
      .get("/api/message/room/" + id + "/?page=" + page)
      .toPromise();
  }
}
