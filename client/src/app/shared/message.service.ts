import { Injectable } from "@angular/core";
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
