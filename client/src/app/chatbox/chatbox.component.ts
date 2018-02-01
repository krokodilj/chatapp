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
  socket: Subject<any>

  private send(message: String): void{
    this.socket.next(message)
    this.message=null;
  }

  constructor(private ws: WebSocketService) { }

  ngOnInit() {
    this.socket = this.ws.getInstance()
    this.socket.subscribe( 
      (msgEvt) => {
        this.messages.unshift(msgEvt.data)
      },(errEvt)=>{
        console.log(errEvt)
        //TODO
      }, () =>{
        console.log("closed")
        //TODO 
      }
    )
  }

  ngOnDestroy(){
    this.socket.unsubscribe()
  }


}
