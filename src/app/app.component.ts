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
    // logout user using authService.
  }

  testApi() {
    // test API access by invoking getResource on authService.
    this.authService.getResource("/friends")
      .subscribe((resp) => {
        this.friends = resp.friends;
      }, (error) => {
        console.error("got error", error);
      });

  }
}
