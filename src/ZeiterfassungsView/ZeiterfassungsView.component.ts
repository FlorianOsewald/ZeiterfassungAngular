import { ZeiterfassungDataModel } from './../ViewDataModels/ZeiterfassungDataModel';
import { Component, OnInit } from '@angular/core';
import { Workday } from 'src/app/DataStructures/Workday';
import { ProgramState } from 'src/app/DataStructures/ProgramState';


@Component({
  selector: 'app-ZeiterfassungsView',
  templateUrl: './ZeiterfassungsView.component.html',
  styleUrls: ['./ZeiterfassungsView.component.css']
})
export class ZeiterfassungsViewComponent implements OnInit {
  title = 'Zeiterfassung';
  zeiterfassung = new ZeiterfassungDataModel();

  constructor() { }

  ngOnInit() {
  }

}
