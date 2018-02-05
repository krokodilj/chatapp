import { Injectable } from '@angular/core';
import { Observable , Observer } from 'rxjs';

@Injectable()
export class SessionService {


  user={
    username:null,
    id:null
  }
  dataChange: Observable<any>
  dataChangeObserver: Observer<any>

  constructor() {
    this.dataChange = new Observable((observer:Observer<any>) => {
      this.dataChangeObserver = observer;
    });
  }

  createSession(token: string){
    localStorage.setItem("chatapp-token",token)
    let data = this.parseJWT(token)
    this.user.id=data.id
    this.user.username = data.username
    this.dataChangeObserver.next(this.user)
  }

  destroySesison(){
    localStorage.removeItem("chatapp-token")
    this.user.id = null
    this.user.username = null
    this.dataChangeObserver.next(this.user)
  }

  activate(){
    console.log("session service activated")
    let token = localStorage.getItem("chatapp-token")
    if(token){
      let data = this.parseJWT(token)
      this.user.id=data.id
      this.user.username=data.username
      //this.dataChangeObserver.next(this.user)
    }
  }

  private parseJWT(token: String){
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));

  }

}
