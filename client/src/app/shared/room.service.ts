import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { HandleHttpResponseService } from "./util/handleHttpResponse.service";

@Injectable()
export class RoomService {
  constructor(
    private http: Http,
    private handleResponse: HandleHttpResponseService
  ) {}

  getAll(): Promise<any> {
    return this.http
      .get("/api/room")
      .toPromise()
      .then(this.handleResponse.extractJSON)
      .catch(this.handleResponse.error);
  }
}
