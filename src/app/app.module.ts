import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZeiterfassungsViewComponent } from '../ZeiterfassungsView/ZeiterfassungsView.component';
import { SettingsViewComponent } from '../SettingsView/SettingsView.component';
import { CorrectionsViewComponent } from '../CorrectionsView/CorrectionsView.component';
import { WallViewComponent } from '../WallView/WallView.component';
import { LoginViewComponent } from '../LoginView/LoginView.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      ZeiterfassungsViewComponent,
      SettingsViewComponent,
      CorrectionsViewComponent,
      WallViewComponent,
      LoginViewComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
