import { ZeiterfassungDataModel } from './../ViewDataModels/ZeiterfassungDataModel';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ZeiterfassungsView',
  templateUrl: './ZeiterfassungsView.component.html',
  styleUrls: ['./ZeiterfassungsView.component.css']
})
export class ZeiterfassungsViewComponent implements OnInit {

  hero: ZeiterfassungDataModel = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  ngOnInit() {
  }

}
