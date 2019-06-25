import { ProgramState } from './ProgramState';
import { Timestamp } from './Timestamp';
import { IDailyEvent } from './IDailyEvent';
import { Workday } from './Workday';
import { ITimestamp } from './ITimestamp';


export class DailyEvent implements IDailyEvent {
    id: number;
    time: ITimestamp;
    eventType: ProgramState;
    workday: Workday;

    constructor(data?: IDailyEvent) {
        if (data !== undefined) {
            this.id = data.id;
            this.time = new Timestamp(undefined, data.time);
            this.eventType = ProgramState[data.eventType.toString()];
            this.workday = data.workday;
        }
    }

    toString() {
        return this.time.toString() + ' ' + this.eventType.toString();
    }
}

