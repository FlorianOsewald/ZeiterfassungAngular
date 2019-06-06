import { SettingsDataModel } from './../ViewDataModels/SettingsDataModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-SettingsView',
  templateUrl: './SettingsView.component.html',
  styleUrls: ['./SettingsView.component.css']
})
export class SettingsViewComponent implements OnInit {
  title = 'Settings';
  settings: SettingsDataModel;

  constructor() { }

  ngOnInit() {
    this.settings = SettingsDataModel.load();
  }

  onSaveDetails() {

  }

  onSaveClockR() {

  }

  onSaveUser() {

  }

  onSaveAdmin() {

  }

}
