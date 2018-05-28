import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: "",
    password: ""
  };

  triedToLogin = false;


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.triedToLogin = true;
    
    this.authService.login(this.user)
      .subscribe((response) => {
        console.log("user has logged in", response)
      }
      )
  }

}
