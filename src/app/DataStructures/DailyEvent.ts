import { ProgramState } from './ProgramState';
import { Timestamp } from './Timestamp';


export class DailyEvent {
    id: number;
    time: Timestamp;
    eventType: ProgramState;

    toString() {
        return this.time.toString() + ' ' + this.eventType.toString();
    }
}

