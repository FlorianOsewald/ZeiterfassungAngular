import { ProgramState } from 'src/app/DataStructures/ProgramState';
import { DailyEvent } from './DailyEvent';
import { Duration } from './Duration';
import { VacationdayModel } from './VacationdayModel';
import { WorkdayType } from './WorkdayType';

export class Workday {
    Date: Date;
    DailyEvents: Array<DailyEvent>;

    TotalWorktime: Duration;
    TotalBreakTime: Duration;

    Type: WorkdayType;

    constructor(vacationday?: VacationdayModel, workdayDate?: Date) {
        if (vacationday === undefined) {
            this.TotalWorktime = new Duration();
            this.TotalBreakTime = new Duration();
            this.Type = WorkdayType.Arbeitstag;
            this.Date = workdayDate != null ? workdayDate : new Date();
        } else {
            this.Date = new Date(vacationday.date);
            this.Type = vacationday.GetWorkdayType();
            this.TotalBreakTime = new Duration();
            if (this.Type === WorkdayType.FeiertagGanz || this.Type === WorkdayType.UrlaubGanz) {
                this.TotalWorktime = new Duration();
                this.TotalWorktime.Hours = 8;
                this.TotalWorktime.Minutes = 0;
            }
            if (this.Type === WorkdayType.FeiertagHalb || this.Type === WorkdayType.UrlaubHalb) {
                this.TotalWorktime = new Duration();
                this.TotalWorktime.Hours = 4;
                this.TotalWorktime.Minutes = 0;
            }
        }
        this.DailyEvents = new Array<DailyEvent>();
    }

    toString() {
        return this.Date.toLocaleDateString();
    }

    getArbeitStart() {
        return this.DailyEvents.find(ev => ev.eventType === ProgramState.ArbeitStart);
    }

    getArbeitEnde() {
        return this.DailyEvents.find(ev => ev.eventType === ProgramState.ArbeitEnde);
    }

    getPausenZeiten() {
        const breakStarts = this.DailyEvents.filter(ev => ev.eventType === ProgramState.PauseStart);
        const breakEnds = this.DailyEvents.filter(ev => ev.eventType === ProgramState.PauseEnde);
 
        if(breakEnds.length === breakStarts.length)
        {
            let retVal = '';
            for(var i = 0; i < breakEnds.length; i++) {
                retVal += breakStarts[i].time + ' - ' + breakEnds[i].time + '; ';
            }
            return retVal;
        }
    }
}
