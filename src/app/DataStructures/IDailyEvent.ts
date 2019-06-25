import { Workday } from './Workday';
import { Timestamp } from './Timestamp';
import { ProgramState } from './ProgramState';

export interface IDailyEvent {

    id: number;
    time: Timestamp;
    eventType: ProgramState;
    workday : Workday;

    toString()
}
