import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../shared/websocket.service'
import { Subject } from 'rxjs/Subject'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username=""
  errorHidden=true

  constructor(private ws: WebSocketService,private router: Router) { }

  private connect(username: String): void {
    this.ws.connect(username,(isConnected)=>{
      if(!isConnected){
        this.errorHidden=false
      }else{
        this.router.navigate(['/chat'])
      }      
    })
    
  }

  ngOnInit() { }

}
