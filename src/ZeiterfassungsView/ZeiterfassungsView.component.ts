import { ZeiterfassungDataModel } from './../ViewDataModels/ZeiterfassungDataModel';
import { Component, OnInit } from '@angular/core';
import { Workday } from 'src/app/DataStructures/Workday';
import { ProgramState } from 'src/app/DataStructures/ProgramState';
import { DailyEvent } from 'src/app/DataStructures/DailyEvent';
import { Timestamp } from 'src/app/DataStructures/Timestamp';
import { DurationFactory } from 'src/app/AddOns/DurationFactory';


@Component({
  selector: 'app-ZeiterfassungsView',
  templateUrl: './ZeiterfassungsView.component.html',
  styleUrls: ['./ZeiterfassungsView.component.css']
})
export class ZeiterfassungsViewComponent implements OnInit {
  title = 'Zeiterfassung';
  zeiterfassung: ZeiterfassungDataModel;

  constructor() {
    this.zeiterfassung = ZeiterfassungDataModel.load();
   }

  ngOnInit() {
  }

  OnStartPressed() {
    if (this.zeiterfassung.state === ProgramState.ArbeitEnde) {
      this.zeiterfassung.startTime = new Date().toLocaleTimeString();
      this.zeiterfassung.workday.DailyEvents.push({eventType:  ProgramState.ArbeitStart, time: new Timestamp(new Date())} as DailyEvent);
      this.zeiterfassung.state = ProgramState.ArbeitStart;
    }
  }

  OnPauseStartPressed() {
    if (this.zeiterfassung.state === ProgramState.ArbeitStart || this.zeiterfassung.state === ProgramState.PauseEnde) {
      this.zeiterfassung.lastBreakStart = new Date().toLocaleTimeString();
      this.zeiterfassung.workday.DailyEvents.push({eventType:  ProgramState.PauseStart, time: new Timestamp(new Date())} as DailyEvent);
      this.zeiterfassung.state = ProgramState.PauseStart;
    }
  }

  OnPauseEndPressed() {
    if (this.zeiterfassung.state === ProgramState.PauseStart) {
      this.zeiterfassung.lastBreakEnd = new Date().toLocaleTimeString();
      this.zeiterfassung.workday.DailyEvents.push({eventType:  ProgramState.PauseEnde, time: new Timestamp(new Date())} as DailyEvent);
      this.zeiterfassung.workday.TotalBreakTime = DurationFactory.GetDurationOfAllBreaks(this.zeiterfassung.workday);
      this.zeiterfassung.state = ProgramState.PauseEnde;
    }
  }

  OnEndePressed() {
    if (this.zeiterfassung.state === ProgramState.PauseEnde || this.zeiterfassung.state === ProgramState.ArbeitStart) {
      this.zeiterfassung.endTime = new Date().toLocaleTimeString();
      this.zeiterfassung.workday.DailyEvents.push({eventType:  ProgramState.ArbeitEnde, time: new Timestamp(new Date())} as DailyEvent);
      this.zeiterfassung.workday.TotalWorktime = DurationFactory.GetWorkDuration(this.zeiterfassung.workday);
      this.zeiterfassung.state = ProgramState.ArbeitEnde;
    }
  }

}
