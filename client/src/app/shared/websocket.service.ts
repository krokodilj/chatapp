import { Injectable } from '@angular/core'
import { Observable , Observer , BehaviorSubject , Subject} from 'rxjs'
import { SessionService } from './session.service'

@Injectable()
export class WebSocketService {
  
  private url = 'ws://localhost:3001'
  public $isConnected: BehaviorSubject<Boolean>
  public $socket: Subject<any>
  private socket: WebSocket

  connect(){
    this.socket = new WebSocket(this.url+`/?token=${this.sessionService.data.token}`)

    this.socket.onopen = () =>{
      this.$socket = this.createSubject()
      this.$isConnected.next(true)
    }
  }

  disconnect() {
    this.socket.close()
    this.$socket=null
    this.$isConnected.next(false)
  }

  private createSubject(): Subject<any>{

    let observer = {
      next: (data:any) =>{
        this.socket.send(data)
      }
    }

    let observable = Observable.create(
      (obs: Observer<any>)=>{
        this.socket.onmessage = obs.next.bind(obs);
        this.socket.onerror = obs.error.bind(obs);
        this.socket.onclose = obs.complete.bind(obs);

        return this.socket.close.bind(this.socket);
      }
    )

    let subject = Subject.create(observer,observable);

    return subject
  }

  constructor(private sessionService: SessionService) {

    this.$isConnected=new BehaviorSubject(false)
    
  }
  
}
