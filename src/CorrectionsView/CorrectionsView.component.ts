import { Timestamp } from './../app/DataStructures/Timestamp';
import { DailyEvent } from './../app/DataStructures/DailyEvent';
import { DailyEventService } from './../app/Services/DailyEvent.service';
import { WorkdayService } from './../app/Services/Workday.service';
import { CorrectionsDataModel } from './../ViewDataModels/CorrectionsDataModel';
import { Component, OnInit, Input } from '@angular/core';
import { Workday } from 'src/app/DataStructures/Workday';
import { User } from 'src/app/DataStructures/User';
import { Duration } from 'src/app/DataStructures/Duration';

@Component({
  selector: 'app-CorrectionsView',
  templateUrl: './CorrectionsView.component.html',
  styleUrls: ['./CorrectionsView.component.css']
})
export class CorrectionsViewComponent implements OnInit {

  title = 'Korrekturen';
  workdays: CorrectionsDataModel;
  @Input() currentUser: User;

  constructor(private workdayService: WorkdayService, private dailyEventService: DailyEventService) {
    this.workdays = CorrectionsDataModel.load();
  }

  ngOnInit() {
    console.log('ngOnInit (View)');
    var tmpWdArray;
    this.workdayService.getWorkdayByUser(this.currentUser.username).subscribe((data: Array<Workday>) => {
      // Executed on Next In WorkdayService.
      console.log("got days data");
      tmpWdArray = data;
    }, (err) => console.log(err), () => {
      // Executed after the Subcription is done.
      // Hier wollen wir die Workdays durchgehen und für alle die Events holen / bearbeiten.
      let realWorkdays = new Array<Workday>();
      tmpWdArray.forEach(d => {
        console.log("got day data for: " + d);
        this.dailyEventService.getDailyEventsOfWorkday(d.id).subscribe((dailyEventData: Array<DailyEvent>) => {
          console.log('Got event Data for day ' + d + " Event: " + dailyEventData);
          //console.log(dailyEventData);
          let realEvents = new Array<DailyEvent>();
          dailyEventData.forEach((dailyEventEntry: DailyEvent) => {

            const timeObj = { hours: dailyEventEntry.time.hours, minutes: dailyEventEntry.time.minutes };
            const timeReal = new Timestamp();
            Object.assign(timeReal, timeObj);

            const evtObj = { id: dailyEventEntry.id, time: timeReal, eventType: dailyEventEntry.eventType };
            const dEvntReal = new DailyEvent();
            Object.assign(dEvntReal, evtObj);
            //console.log('Pushing into RealEvents:');
            //console.log(dEvntReal);
            realEvents.push(dEvntReal);
          });
          // List mit realEvents vorhanden.
          // Aber immer noch im Code der während des DailyEvent calls ausgeführt wird.
          // nun muss das echt Workday Element erstellt werden und in das Array gepusht werden.

          const nTotalW = new Duration();
          const nTotalB = new Duration();
          const realDate = new Date(d['date']);
          const wdObj = { id: d.id, username: d.username, DailyEvents: realEvents, Date: realDate, TotalBreakTime: nTotalB, TotalWorktime: nTotalW };
          const wdReal = new Workday();
          Object.assign(wdReal, wdObj);
          console.log('Pushing into RealWorkdays:');
          console.log(wdReal);
          realWorkdays.push(wdReal);
        });
        setTimeout(() => this.workdays = CorrectionsDataModel.load(realWorkdays), 1000);
        // DailyEventService ist durchgelaufen. Wir haben jetzt einen Workday mit korrekten Daily Events.
      });

    });
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
      this.dailyEventService.deleteDailyEventsOfWorkday(wd.id).subscribe(data => console.log('deleting Events: ' + data), () => console.log('Done deleting Events'));
      //this.workdayService.deleteWorkday(wd.id).subscribe(data => console.log('deleting workday: ' + data), () => console.log('Done deleting Workday'));
    }
  }

  onSave(wd: Workday) {
    this.dailyEventService.deleteDailyEventsOfWorkday(wd.id).subscribe((data) => console.log('deleting data:' + data), () => console.log('Done deleting Daily events of to be modified Workday!'));
    this.workdays.modifyWorkday(wd);
    // tslint:disable-next-line: max-line-length
    wd.DailyEvents.forEach(de => this.dailyEventService.createDailyEvent(de, wd).subscribe(data => console.log('saving data: ' + data), () => console.log('Done saving Daily Events of modified Workday')));
    this.workdayService.updateWorkday(wd.id, wd);
  }

  onFilterTextChanged(input: string) {
    this.workdays.manageFiltering(input);
  }
}
