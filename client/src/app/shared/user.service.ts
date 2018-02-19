import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { User } from "../_model/user";
import { SessionService } from "./session.service";
import { HandleHttpResponseService } from "./util/handleHttpResponse.service";

@Injectable()
export class UserService {
  headers = new Headers({ "Content-Type": "application/json" });

  constructor(
    private http: Http,
    private sessionService: SessionService,
    private handleResponse: HandleHttpResponseService
  ) {}

  create(user: User): Promise<Number> {
    return this.http
      .post("/api/user", JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(this.handleResponse.extractJSON)
      .catch(this.handleResponse.error);
  }

  getOne(id: Number): Promise<User> {
    return this.http
      .get("/api/user/" + id)
      .toPromise()
      .then(this.handleResponse.extractJSON)
      .catch(this.handleResponse.error);
  }

  getUserRooms(id: Number): Promise<any> {
    let headers = new Headers({ "Auth-Token": this.sessionService.data.token });
    return this.http
      .get("/api/user/" + id + "/rooms", { headers: headers })
      .toPromise()
      .then(this.handleResponse.extractJSON)
      .catch(this.handleResponse.error);
  }

  uploadUserAvatar(id: Number, file: File): Promise<any> {
    let formData: FormData = new FormData();
    formData.append("image", file, file.name);
    return this.http
      .put("/api/user/" + id + "/upload", formData)
      .toPromise()
      .then(this.handleResponse.extractJSON)
      .catch(this.handleResponse.error);
  }
}
