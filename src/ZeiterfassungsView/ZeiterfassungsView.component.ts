import { Clockr } from './../app/DataStructures/Clockr';
import { DailyEventService } from './../app/Services/DailyEvent.service';
import { ClockrService } from './../app/Services/Clockr.service';
import { Workday } from 'src/app/DataStructures/Workday';
import { WorkdayService } from './../app/Services/Workday.service';
import { ZeiterfassungDataModel } from './../ViewDataModels/ZeiterfassungDataModel';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProgramState } from 'src/app/DataStructures/ProgramState';
import { DailyEvent } from 'src/app/DataStructures/DailyEvent';
import { Timestamp } from 'src/app/DataStructures/Timestamp';
import { User } from 'src/app/DataStructures/User';
import { IDailyEvent } from 'src/app/DataStructures/IDailyEvent';
import { IWorkday } from 'src/app/DataStructures/IWorkday';

@Component({
  selector: 'app-ZeiterfassungsView',
  templateUrl: './ZeiterfassungsView.component.html',
  styleUrls: ['./ZeiterfassungsView.component.css']
})
export class ZeiterfassungsViewComponent implements OnInit, OnDestroy {
  title = 'Zeiterfassung';
  zeiterfassung: ZeiterfassungDataModel;
  @Input() currentUser: User;

  constructor(private workdayService: WorkdayService, private clockrService: ClockrService, private dailyEventService: DailyEventService) {
    // to supress console errors since this method is called before the OnInit. That means the html template that access the datamodel will get undefined errors. This fixes these.
    // no drawback since the view is only seen after OnInit is run, and by that time we have an actual object instead of this shell.
    this.zeiterfassung = new ZeiterfassungDataModel();
  }

  ngOnInit() {

    console.log('OnInit von ZeiterfassungsView. CurrentUser: ');
    console.log(this.currentUser);

    var wdPromise = this.workdayService.getWorkdayTodayByUser(this.currentUser.username).toPromise();

    var workday: Workday;

    wdPromise.then(data => {
      if (data === null) {
        workday = new Workday();
        workday.username = this.currentUser.username;
        this.workdayService.createWorkday(workday).subscribe(data => console.log(data));
      } else {
        var dailyEventArray = new Array<DailyEvent>();

        data.dailyEvents.forEach(ev => {
          ev.time = new Timestamp(undefined, ev.time);
          dailyEventArray.push(new DailyEvent(ev));
        });
        data.dailyEvents = dailyEventArray;
        workday = new Workday(data);
      }
    });

    wdPromise.finally(() => this.zeiterfassung = ZeiterfassungDataModel.load(workday));
  }

  ngOnDestroy(): void {
  }

  OnStartPressed() {
    if (this.zeiterfassung.state === ProgramState.ArbeitEnde && this.zeiterfassung.workday.dailyEvents.find(de => de.eventType === ProgramState.ArbeitStart) === undefined) {
      this.zeiterfassung.startTime = new Date().toLocaleTimeString();
      this.processNewEvent(ProgramState.ArbeitStart);
    }
  }

  OnPauseStartPressed() {
    if (this.zeiterfassung.state === ProgramState.ArbeitStart || this.zeiterfassung.state === ProgramState.PauseEnde) {
      this.zeiterfassung.lastBreakStart = new Date().toLocaleTimeString();
      this.processNewEvent(ProgramState.PauseStart);
    }
  }

  OnPauseEndPressed() {
    if (this.zeiterfassung.state === ProgramState.PauseStart) {
      this.zeiterfassung.lastBreakEnd = new Date().toLocaleTimeString();
      this.processNewEvent(ProgramState.PauseEnde);
    }
  }

  OnEndePressed() {
    if (this.zeiterfassung.state === ProgramState.PauseEnde || this.zeiterfassung.state === ProgramState.ArbeitStart) {
      this.zeiterfassung.endTime = new Date().toLocaleTimeString();
      this.processNewEvent(ProgramState.ArbeitEnde);
    }
  }

  processNewEvent(type: ProgramState) {
    this.zeiterfassung.state = type;
    let newEvent = new DailyEvent();
    newEvent.eventType = type;
    newEvent.time = new Timestamp(new Date());

    this.dailyEventService.createDailyEvent(newEvent, this.zeiterfassung.workday).subscribe((data: IDailyEvent) => {
      data.time = new Timestamp(undefined, data.time);
      newEvent = new DailyEvent(data);
      console.log('Creating DailyEvent for Type: ' + type);
      console.log(data);

      this.zeiterfassung.workday.dailyEvents.push(newEvent);

      console.log('updating Workday with new Event');
      this.workdayService.updateWorkday(this.zeiterfassung.workday.id, this.zeiterfassung.workday).subscribe((wdData: IWorkday) => {
        console.log(wdData);

        var dailyEventArray = new Array<DailyEvent>();

        wdData.dailyEvents.forEach(ev => {
          ev.time = new Timestamp(undefined, ev.time);
          dailyEventArray.push(new DailyEvent(ev));
        });
        wdData.dailyEvents = dailyEventArray;
        this.zeiterfassung.workday = new Workday(wdData);


        if (type === ProgramState.PauseEnde || type === ProgramState.ArbeitEnde) {
          this.zeiterfassung.updateTotalTimes();
        }

        this.zeiterfassung.state = type;
        this.sendEventClockr(type);
      });

    });
  }

  sendEventClockr(type: ProgramState) {
    const newClockr = new Clockr();
    newClockr.time = new Date();
    newClockr.user = this.currentUser;

    switch (type) {
      case ProgramState.ArbeitStart: {
        newClockr.message = this.currentUser.workStartClockrMessage;
        break;
      }
      case ProgramState.PauseStart: {
        newClockr.message = this.currentUser.breakStartClockrMessage;
        break;
      }
      case ProgramState.PauseEnde: {
        newClockr.message = this.currentUser.breakEndClockrMessage;
        break;
      }
      case ProgramState.ArbeitEnde: {
        newClockr.message = this.currentUser.workEndClockrMessage;
        break;
      }
    }
    console.log('sending Clockr for Type: ' + type);
    this.clockrService.createClockr(newClockr).subscribe(data => console.log(data));
  }

}
