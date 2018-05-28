import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  friends = [];

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout()
    this.friends = [];
  }

  get displayOnline() {
    return localStorage.getItem("user") !== null;
  }

  testApi() {
    this.authService.getResource("/friends")
      .subscribe((resp) => {
        this.friends = resp.friends;
      }, (error) => {
        console.error("got error", error);
      });

  }
}
