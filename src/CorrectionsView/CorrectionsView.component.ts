import { CorrectionsDataModel } from './../ViewDataModels/CorrectionsDataModel';
import { Component, OnInit } from '@angular/core';
import { Workday } from 'src/app/DataStructures/Workday';

@Component({
  selector: 'app-CorrectionsView',
  templateUrl: './CorrectionsView.component.html',
  styleUrls: ['./CorrectionsView.component.css']
})
export class CorrectionsViewComponent implements OnInit {

  title = 'Korrekturen';
  workdays: CorrectionsDataModel;


  constructor() { }

  ngOnInit() {
    this.workdays = CorrectionsDataModel.load();
  }

  onSelect(wd: Workday) {
    if (this.workdays.selectedDay !== wd) {
      this.workdays.setSelectedWorkday(wd);
    }
  }

  onReset() {
    this.workdays.revertWorkday();
  }

  onDelete(wd: Workday) {
    const result = confirm('Wollen Sie wirklich diesen Datensatz löschen?');
    if (result === true) {
      this.workdays.deleteWorkday(wd);
    }
  }

  onSave(wd: Workday) {
    this.workdays.modifyWorkday(wd);
  }

  onFilterTextChanged(input: string) {
    this.workdays.manageFiltering(input);
  }
}
