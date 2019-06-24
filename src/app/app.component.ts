import { Component, OnInit } from '@angular/core';
import { User } from './DataStructures/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zeiterfassung';
  showZeiterfassung = false;
  showSettings = false;
  showCorrections = false;
  showFeed = false;
  showLogin = true;
  currentUser: User;

  loginStatusChanged(loggedInUser: User) {
      this.showZeiterfassung = true;
      this.showLogin = false;
      this.currentUser = loggedInUser;
      console.log("In AppComponent: User that logged in: "); console.log(this.currentUser);
  }

    public OnButtonClick(origin: string) {
      switch ( origin ) {
        case 'Zeiterfassung': {
          this.showZeiterfassung = true;
          this.showSettings = false;
          this.showCorrections = false;
          this.showFeed = false;
          break;
        }
        case 'Settings': {
          this.showZeiterfassung = false;
          this.showSettings = true;
          this.showCorrections = false;
          this.showFeed = false;
          break;
        }
        case 'Corrections': {
          this.showZeiterfassung = false;
          this.showSettings = false;
          this.showCorrections = true;
          this.showFeed = false;
          break;
        }
        case 'Feed': {
          this.showZeiterfassung = false;
          this.showSettings = false;
          this.showCorrections = false;
          this.showFeed = true;
          break;
        }
      }
  }
}
