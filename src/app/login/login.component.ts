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

  get displayForm() {
    return localStorage.getItem("user") == null;
  }

  login() {
    this.triedToLogin = true;

    this.authService.login(this.user)
      .subscribe((response) => {
        this.triedToLogin = false;

        this.user = {
          username: "",
          password: ""
        };
      }
      )
  }

}
