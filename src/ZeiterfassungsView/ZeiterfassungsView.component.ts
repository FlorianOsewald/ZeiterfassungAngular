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

    this.workdayService.getWorkdayTodayByUser(this.currentUser.username).subscribe((data: Workday) => {
      console.log('workdayService.getWorkdayTodayByUser Returned: ');
      console.log(data);
      let tmpWd;
      if (data === null) {
        this.zeiterfassung = ZeiterfassungDataModel.load();
        this.zeiterfassung.workday.username = this.currentUser.username;
        this.workdayService.createWorkday(this.zeiterfassung.workday).subscribe(data => console.log(data));
      } else {
        // Wir haben einen Workday. Also holen wir uns dafür die DailyEvent Daten.
        tmpWd = data;
        this.dailyEventService.getDailyEventsOfWorkday(tmpWd.id).subscribe((dailyEventData: Array<DailyEvent>) => {
          console.log(dailyEventData);
          // Jetzt haben wir allerdings nur Objects mit den selben Attributen. aber keine actual klassen vom Type DailyEvent. Daher müssen wir uns nun selbst ein Object zusammenbauen
          // dailyEventData ist ein Array<Object>
          const realEvents = new Array<DailyEvent>();
          dailyEventData.forEach(de => {
            let evntTimeObj = { hours: de.time.hours, minutes: de.time.minutes };
            let evntTime = new Timestamp();
            Object.assign(evntTime, evntTimeObj);
            // Now evntTime is a real Timestamp object

            // Now all necessary classes are real typed objects

            let dailyEventObj = { id: de.id, time: evntTime, eventType: de.eventType };
            let dailyEvnt = new DailyEvent();
            Object.assign(dailyEvnt, dailyEventObj);

            realEvents.push(dailyEvnt);
            // Now realEvent holds a real DailyEvent Objects instead of a Any Object
          });

          tmpWd.DailyEvents = realEvents;
          this.zeiterfassung = ZeiterfassungDataModel.load(tmpWd);
        });
      }
    });

  }

  ngOnDestroy(): void {
  }

  OnStartPressed() {
    if (this.zeiterfassung.state === ProgramState.ArbeitEnde && this.zeiterfassung.workday.DailyEvents.find(de => de.eventType.toString() === 'ArbeitStart') === undefined) {
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

    this.dailyEventService.createDailyEvent(newEvent, this.zeiterfassung.workday).subscribe((data: DailyEvent) => {
      newEvent = data;
      console.log('Creating DailyEvent for Type: ' + type);
      console.log(data);

      this.zeiterfassung.workday.DailyEvents.push(newEvent);

      console.log('updating Workday with new Event');
      this.workdayService.updateWorkday(this.zeiterfassung.workday.id, this.zeiterfassung.workday).subscribe((data: Workday) => {
        console.log(data);
        this.zeiterfassung.workday = data;

        if (type === ProgramState.PauseEnde || type === ProgramState.ArbeitEnde) {
          this.ngOnInit();
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
