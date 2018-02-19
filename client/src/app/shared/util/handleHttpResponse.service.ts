import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

@Injectable()
export class HandleHttpResponseService {
  constructor(private http: Http) {}

  extractJSON(res: Response) {
    let body = res.json();
    return body || {};
  }

  error(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
