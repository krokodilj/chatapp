import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service'
import { User } from '../_model/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  user: User = new User()
  errorHidden = true

  constructor(private userService: UserService) { }

  ngOnInit() { }

  register(user: User){
    this.userService.create(this.user)
      .then((val)=>{
        alert("success , your id is "+val)
        this.user= new User()
        //TODO
        //uloguj ga i redirect
      })
      .catch((val)=>{
        this.errorHidden = false
      })
  }

}
