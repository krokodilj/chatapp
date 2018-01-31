import { Injectable } from '@angular/core';
import { Subject , Observable , Observer} from 'rxjs';

@Injectable()
export class WebSocketService {
  
  private socket: Subject<String>;
  
  public connect(username: String): Subject<String> {
    if(!this.socket) this.socket=this.create('ws://localhost:3001',username);
    return this.socket;
  }

  private create(url,username): Subject<String>{

    let ws = new WebSocket(`${url}/?username=${username}`);

    let observer = {
      next: (data:String) =>{
        if(ws.readyState==WebSocket.OPEN)
          ws.send(data)
      }
    }

    let observable = Observable.create(
      (obs: Observer<String>)=>{
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);

        return ws.close.bind(ws);
      }
    )

    return Subject.create(observer,observable);
  }

  constructor() { }
  
}
