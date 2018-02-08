import { Injectable } from '@angular/core'
import { Router , CanActivate } from '@angular/router'
import { SessionService } from '../session.service'

@Injectable()
export class CanActivateIfGuest implements CanActivate{

  constructor(
    private sessionService: SessionService,
    private router: Router) { }

  canActivate() {
    if(this.sessionService.data.token!=null){
      this.router.navigate(['/chat'])
      return false
    }
    return true
  }

}