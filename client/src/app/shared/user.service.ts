import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { User } from "../_model/user";

@Injectable()
export class UserService {
  headers = new Headers({ "Content-Type": "application/json" });

  constructor(private http: Http) {}

  create(user: User): Promise<Number> {
    return this.http
      .post("/api/user", JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getOne(id: Number): Promise<User> {
    return this.http
      .get("/api/user/" + id)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getUserRooms(id: Number): Promise<any> {
    return this.http
      .get("/api/user/" + id + "/rooms")
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
