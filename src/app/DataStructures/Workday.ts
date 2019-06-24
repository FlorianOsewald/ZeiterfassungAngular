import { ProgramState } from 'src/app/DataStructures/ProgramState';
import { DailyEvent } from './DailyEvent';
import { Duration } from './Duration';


export class Workday {
    id: number;
    Date: Date;
    DailyEvents: Array<DailyEvent>;
    username: string;

    TotalWorktime: Duration;
    TotalBreakTime: Duration;



    constructor(workdayDate?: Date) {

        this.TotalWorktime = new Duration();
        this.TotalBreakTime = new Duration();
        this.Date = workdayDate !== undefined ? workdayDate : new Date();

        this.username = '';

        this.DailyEvents = new Array<DailyEvent>();
    }

    toString() {
        return this.Date.toLocaleDateString();
    }

    getArbeitStart() {
        var retVal = this.DailyEvents.find(ev => ev.eventType === ProgramState.ArbeitStart);
        if (retVal === undefined ) {
            retVal = this.DailyEvents.find(ev => ev.eventType.toString() === 'ArbeitStart');
        }
        return retVal;
    }

    getArbeitEnde() {
        var retVal = this.DailyEvents.find(ev => ev.eventType === ProgramState.ArbeitEnde);
        if (retVal === undefined ) {
            retVal = this.DailyEvents.find(ev => ev.eventType.toString() === 'ArbeitEnde');
        }
        return retVal;
    }

    getPausenZeiten() {
        let breakStarts;
        breakStarts = this.DailyEvents.filter(ev => ev.eventType === ProgramState.PauseStart);
        if (breakStarts.length === 0) {
            breakStarts = this.DailyEvents.filter(ev => ev.eventType.toString() === 'PauseStart');
        }
        let breakEnds;
        breakEnds = this.DailyEvents.filter(ev => ev.eventType === ProgramState.PauseEnde);
        if (breakEnds.length === 0) {
            breakEnds = this.DailyEvents.filter(ev => ev.eventType.toString() === 'PauseEnde');
        }

        if (breakEnds.length === breakStarts.length) {
            let retVal = '';
            for (var i = 0; i < breakEnds.length; i++) {
                retVal += breakStarts[i].time + ' - ' + breakEnds[i].time + '; ';
            }
            return retVal;
        }
    }
}
