import { Timestamp } from './../app/DataStructures/Timestamp';
import { DailyEvent } from './../app/DataStructures/DailyEvent';
import { DailyEventService } from './../app/Services/DailyEvent.service';
import { WorkdayService } from './../app/Services/Workday.service';
import { CorrectionsDataModel } from './../ViewDataModels/CorrectionsDataModel';
import { Component, OnInit, Input } from '@angular/core';
import { Workday } from 'src/app/DataStructures/Workday';
import { User } from 'src/app/DataStructures/User';

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
    var wdArray = new Array<Workday>();

    var wdPromise = this.workdayService.getWorkdayByUser(this.currentUser.username).toPromise();

    wdPromise.then((wdData) => {
      wdData.forEach(wd => {
        var dailyEventArray = new Array<DailyEvent>();

        wd.dailyEvents.forEach(ev => {
          ev.time = new Timestamp(undefined, ev.time);
          dailyEventArray.push(new DailyEvent(ev));
        });
        wd.dailyEvents = dailyEventArray;
      });

      wdData.forEach(wd => wdArray.push(new Workday(wd)));
    });

    wdPromise.finally(() => {
      // wdArray ist nun voll besetzt
      this.workdays = CorrectionsDataModel.load(wdArray);
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
      this.workdayService.deleteWorkday(wd.id).subscribe(data => console.log('deleting workday: ' + data), () => console.log('Done deleting Workday'));
    }
  }

  onSave(wd: Workday) {
    this.dailyEventService.deleteDailyEventsOfWorkday(wd.id).subscribe((data) => console.log('deleting data:' + data), () => console.log('Done deleting Daily events of to be modified Workday!'));
    this.workdays.modifyWorkday(wd);
    // tslint:disable-next-line: max-line-length
    wd.dailyEvents.forEach(de => this.dailyEventService.createDailyEvent(de, wd).subscribe(data => console.log('saving data: ' + data), () => console.log('Done saving Daily Events of modified Workday')));
    this.workdayService.updateWorkday(wd.id, wd);
  }

  onFilterTextChanged(input: string) {
    this.workdays.manageFiltering(input);
  }
}
