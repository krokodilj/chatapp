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
    this.socket.next(message)
    this.message=null;
  }

  constructor(private ws: WebSocketService) { }

  ngOnInit() {
    this.getAndSubscribe()
  }

  ngOnDestroy(){
    this.socket.unsubscribe()
  }
  
  private getAndSubscribe():void{
    this.socket=this.ws.getInstance()
    this.socket.subscribe(this.subscription.onNext,this.subscription.onError,this.subscription.onCompleted)
  }

  private subscription={
    onNext: (msgEvt) => {
      let data = JSON.parse(msgEvt.data)
      this.messages.unshift(data)
    },
    onError:(errEvt)=>{
      console.log(errEvt)
      this.ws.reconnect((isConnected)=>{
        if(isConnected) this.getAndSubscribe()
      })
    },
    onCompleted: () =>{
      console.log("closed")
      this.onDisconnect()
      this.ws.reconnect((isConnected)=>{
        if(isConnected) {    
          this.onReconnect()      
        }
      })
    }
  }

  private onDisconnect(){
    this.error=true
    this.messages.unshift({message:'~~~~ disconnected from server ~~~~~'})

  }

  private onReconnect(){
    this.messages.unshift({message:'~~~ reconnected ~~~~'})
    this.error=false
    this.getAndSubscribe()
  }


}
