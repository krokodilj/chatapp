import { Injectable } from "@angular/core";
import { HandleHttpResponseService } from "./util/handleHttpResponse.service";
import { Http, Headers } from "@angular/http";
import { SessionService } from "./auth/session.service";

@Injectable()
export class RoomRequestServiceService {
  constructor(
    private http: Http,
    private sessionService: SessionService,
    private handleResponse: HandleHttpResponseService
  ) {}

  createRequest(roomId): Promise<any> {
    let headers = new Headers({ "Auth-Token": this.sessionService.data.token });
    headers.append("Content-Type", "application/json");
    return this.http
      .post("/api/room_request", { roomId: roomId }, { headers: headers })
      .toPromise()
      .then(this.handleResponse.extractJSON)
      .catch(this.handleResponse.error);
  }
}
