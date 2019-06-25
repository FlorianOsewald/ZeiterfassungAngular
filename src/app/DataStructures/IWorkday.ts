import { DailyEvent } from './DailyEvent';
import { Duration } from './Duration';

export interface IWorkday {
    id: number;
    date: Date;
    dailyEvents: Array<DailyEvent>;
    username: string;

    TotalWorktime: Duration;
    TotalBreakTime: Duration;

    toString();
    getArbeitStart();
    getArbeitEnde();
    getPausenZeiten();
}
