import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Open Play';

  constructor(public _cs: CommonService, private router: Router, public _as: AuthService) {
    if(this._cs.isLoggedIn()){
      this.router.navigateByUrl('/diary')
    }
   }

  logout() {
    console.log("Logout clicked")
    this._cs.cleanSessionValue('name');
    this._cs.cleanSessionValue('accessToken');
    this.router.navigateByUrl('/')

  }
}
