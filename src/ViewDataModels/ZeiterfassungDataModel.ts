import { Workday } from 'src/app/DataStructures/Workday';
import { ProgramState } from 'src/app/DataStructures/ProgramState';
import { User } from 'src/app/DataStructures/User';
import { DailyEvent } from 'src/app/DataStructures/DailyEvent';
import { Duration } from 'src/app/DataStructures/Duration';
import { DurationFactory } from 'src/app/AddOns/DurationFactory';
import { Timestamp } from 'src/app/DataStructures/Timestamp';


export class ZeiterfassungDataModel {
    workday: Workday;
    startTime: string;
    endTime: string;
    lastBreakStart: string;
    lastBreakEnd: string;
    state: ProgramState;

    constructor(wd?: Workday) {
        console.log("Constructing Zeiterfassungsdatamodel with Workday: ");
        console.log(wd);
        if (wd === undefined) {
            console.log("WD Undefined, creating a new one");
            this.workday = new Workday();
            this.workday.Date = new Date();
            this.workday.DailyEvents = new Array<DailyEvent>();
            this.workday.TotalBreakTime = new Duration();
            this.workday.TotalWorktime = new Duration();


            this.startTime = '-/-';
            this.endTime = '-/-';
            this.lastBreakStart = '-/-';
            this.lastBreakEnd = '-/-';
            this.state = ProgramState.ArbeitEnde;
        } else {
            console.log("WD Provided. Transfering Data to current object");
            this.workday = wd;
            this.workday.TotalBreakTime = new Duration();
            this.workday.TotalWorktime = new Duration();
            this.state = ProgramState.ArbeitEnde;
            this.startTime = '-/-';
            this.endTime = '-/-';
            this.lastBreakStart = '-/-';
            this.lastBreakEnd = '-/-';

            if (this.workday.DailyEvents !== undefined) {
                // tslint:disable-next-line: max-line-length
                const wdObj = { id: this.workday.id, username: this.workday.username, DailyEvents: this.workday.DailyEvents, Date: this.workday.Date, TotalBreakTime: this.workday.TotalBreakTime, TotalWorktime: this.workday.TotalWorktime };
                Object.assign(this.workday, wdObj);

                const wStart = 'ArbeitStart';
                const bStart = 'PauseStart';
                const bEnd = 'PauseEnde';
                const wEnd = 'ArbeitEnde';

                if (this.workday.DailyEvents.find(de => de.eventType.toString() === wStart) !== undefined) {
                    this.state = ProgramState.ArbeitStart;
                    const evnt = this.workday.DailyEvents.find(de => de.eventType.toString() === wStart);
                    this.startTime = ZeiterfassungDataModel.assignObjAsTimespan(evnt);
                }
                if (this.workday.DailyEvents.find(de => de.eventType.toString() === bStart) !== undefined) {
                    this.state = ProgramState.PauseStart;
                    var index = this.workday.DailyEvents.filter(de => de.eventType.toString() === bStart).length - 1;
                    const evnt = this.workday.DailyEvents.filter(de => de.eventType.toString() === bStart)[index];
                    this.lastBreakStart = ZeiterfassungDataModel.assignObjAsTimespan(evnt);
                }
                if (this.workday.DailyEvents.find(de => de.eventType.toString() === bEnd) !== undefined) {
                    var indexStart = this.workday.DailyEvents.filter(de => de.eventType.toString() === bStart).length - 1;
                    var index = this.workday.DailyEvents.filter(de => de.eventType.toString() === bEnd).length - 1;
                    const evnt = this.workday.DailyEvents.filter(de => de.eventType.toString() === bEnd)[index];
                    this.lastBreakEnd = ZeiterfassungDataModel.assignObjAsTimespan(evnt);
                    this.state = indexStart === index ? ProgramState.PauseEnde : ProgramState.PauseStart;
                    this.workday.TotalBreakTime = DurationFactory.GetDurationOfAllBreaks(this.workday);
                }
                if (this.workday.DailyEvents.find(de => de.eventType.toString() === wEnd) !== undefined) {
                    this.state = ProgramState.ArbeitEnde;
                    const evnt = this.workday.DailyEvents.find(de => de.eventType.toString() === wEnd)
                    this.endTime = ZeiterfassungDataModel.assignObjAsTimespan(evnt);
                    this.workday.TotalWorktime = DurationFactory.GetWorkDuration(this.workday);
                }
            } else {
                this.workday.DailyEvents = new Array<DailyEvent>();
            }

        }

    }

    private static assignObjAsTimespan(obj: any): string {
        let timeObj = { hours: obj.time.hours, minutes: obj.time.minutes };
        let time = new Timestamp();
        Object.assign(time, timeObj);
        return time.toString();
    }

    static load(wd?: Workday): ZeiterfassungDataModel {
        if (wd === null) {
            return new ZeiterfassungDataModel(undefined);
        }
        return new ZeiterfassungDataModel(wd);
    }

}