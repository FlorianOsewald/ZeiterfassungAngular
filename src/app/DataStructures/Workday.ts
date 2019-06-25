import { ProgramState } from 'src/app/DataStructures/ProgramState';
import { DailyEvent } from './DailyEvent';
import { Duration } from './Duration';
import { IWorkday } from './IWorkday';
import { IDailyEvent } from './IDailyEvent';


export class Workday implements IWorkday {
    id: number;
    date: Date;
    dailyEvents: Array<IDailyEvent>;
    username: string;

    TotalWorktime: Duration;
    TotalBreakTime: Duration;

    constructor(data ?: IWorkday) {
        
        this.id = data !== undefined ? data.id : undefined;
        this.TotalWorktime = new Duration();
        this.TotalBreakTime = new Duration();
        this.date = data !== undefined ? new Date(data.date) : new Date();

        this.username = data !== undefined ? data.username : '';

        this.dailyEvents = data !== undefined ? data.dailyEvents : new Array<DailyEvent>();
    }

    toString() {
        return this.date.toLocaleDateString();
    }

    getArbeitStart() {
        var retVal = this.dailyEvents.find(ev => ev.eventType === ProgramState.ArbeitStart);
        return retVal;
    }

    getArbeitEnde() {
        var retVal = this.dailyEvents.find(ev => ev.eventType === ProgramState.ArbeitEnde);
        return retVal;
    }

    getPausenZeiten() {
        let breakStarts;
        breakStarts = this.dailyEvents.filter(ev => ev.eventType === ProgramState.PauseStart);

        let breakEnds;
        breakEnds = this.dailyEvents.filter(ev => ev.eventType === ProgramState.PauseEnde);

        if (breakEnds.length === breakStarts.length) {
            let retVal = '';
            for (var i = 0; i < breakEnds.length; i++) {
                retVal += breakStarts[i].time + ' - ' + breakEnds[i].time + '; ';
            }
            return retVal;
        }
    }
}
