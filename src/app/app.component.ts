import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  title = 'angular-15-demo-application';
  isadminuser = false;
  ismenurequired = false;
  constructor(private router: Router, private service: AuthService) {

  }
  ngDoCheck(): void {
    let currenturl = this.router.url;
    if (currenturl == '/login' || currenturl == '/register') {
      this.ismenurequired = false;
    } else {
      this.ismenurequired = true;
    }

    let userrole=sessionStorage.getItem('userrole');    
    if(userrole === 'admin'){
      this.isadminuser = true;
    }else{
      this.isadminuser = false;
    }

  }

}

