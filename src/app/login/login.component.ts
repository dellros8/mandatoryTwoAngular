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
  }

  constructor(private authService: AuthService) { }

  login() {
    // login user using authService.
    this.authService.login(this.user)
    .subscribe(() => {
      console.log("blabla")
    }
    )
  }

  ngOnInit() {
  }

}
