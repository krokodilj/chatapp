import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../shared/websocket.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styles: []
})
export class ChatboxComponent implements OnInit {

  message: String
  messages = []
  socket: Subject<String>

  private send(message: String): void{
    this.socket.next(message)
    this.message=null;
  }

  constructor(private ws: WebSocketService) { }

  ngOnInit() {
    this.socket = this.ws.connect("asd")
    this.socket.subscribe( (val) => {
      this.messages.unshift(val.data)
    })
  }

  ngOnDestroy(){
    this.socket.unsubscribe()
  }


}
