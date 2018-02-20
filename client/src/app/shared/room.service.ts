import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { HandleHttpResponseService } from "./util/handleHttpResponse.service";
import { SessionService } from "./session.service";
import { Room } from "../model/Room";

@Injectable()
export class RoomService {
  constructor(
    private http: Http,
    private sessionService: SessionService,
    private handleResponse: HandleHttpResponseService
  ) {}

  getAll(): Promise<any> {
    return this.http
      .get("/api/room")
      .toPromise()
      .then(this.handleResponse.extractJSON)
      .catch(this.handleResponse.error);
  }

  create(room: Room): Promise<any> {
    let headers = new Headers({ "Auth-Token": this.sessionService.data.token });
    headers.append("Content-Type", "application/json");
    return this.http
      .post("/api/room", room, { headers: headers })
      .toPromise()
      .then(this.handleResponse.extractJSON)
      .catch(this.handleResponse.error);
  }

  joinRoom(roomId): Promise<any> {
    let headers = new Headers({ "Auth-Token": this.sessionService.data.token });
    headers.append("Content-Type", "application/json");
    return this.http
      .post("/api/room/" + roomId + "/join", {}, { headers: headers })
      .toPromise()
      .then(this.handleResponse.extractJSON)
      .catch(this.handleResponse.error);
  }
}
