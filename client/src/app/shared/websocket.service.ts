import { Injectable } from '@angular/core';
import { Subject , Observable , Observer} from 'rxjs';

@Injectable()
export class WebSocketService {
  
  private url = 'ws://localhost:3001'

  private socket: WebSocket

  private subject: Subject<String>

  public connect(token: String) {    
      this.socket = new WebSocket(`${this.url}/?token=${token}`);
      this.subject = this.createSubject()
  }

  public getInstance(): Subject<String> {
    console.log(this.subject)
    return this.subject;
  }

  // public reconnect(cb:Function){
  //   let interval = setInterval(()=>{
  //     this.connect(this.username,(isConnected)=>{
  //       if(isConnected){
  //         clearInterval(interval)
  //         cb(true)
  //       }
  //     })
  //   },2000)    
  // }

  private createSubject(): Subject<String>{

    let observer = {
      next: (data:String) =>{
        this.socket.send(data)
      }
    }

    let observable = Observable.create(
      (obs: Observer<String>)=>{
        this.socket.onmessage = obs.next.bind(obs);
        this.socket.onerror = obs.error.bind(obs);
        this.socket.onclose = obs.complete.bind(obs);

        return this.socket.close.bind(this.socket);
      }
    )

    let subject = Subject.create(observer,observable);

    return subject
  }

  constructor() { }
  
}
