import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../shared/websocket.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  message: String
  messages = []
  socket: Subject<any>
  error=false

  private send(message: String): void{
    this.ws.$socket.next(message)
  }

  constructor(private ws: WebSocketService) { }

  ngOnInit() {
     this.ws.$isConnected.subscribe(val =>{
      if(val){
        this.ws.$socket.subscribe(this.subscription.onNext)
      }
     })
  }
  
  private subscription={
    onNext: (msgEvt: any):void => {
      let data = JSON.parse(msgEvt.data)
      this.messages.unshift(data)
    }
  }
}
