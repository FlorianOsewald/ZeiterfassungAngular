import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zeiterfassung';
  showZeiterfassung = false;
  showSettings = true;
  showCorrections = false;
  showFeed = false;

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
