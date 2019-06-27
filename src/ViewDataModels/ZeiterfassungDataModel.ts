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
        if (wd === undefined) {
            this.workday = new Workday();
            this.workday.date = new Date();
            this.workday.dailyEvents = new Array<DailyEvent>();
            this.workday.TotalBreakTime = new Duration();
            this.workday.TotalWorktime = new Duration();


            this.startTime = '-/-';
            this.endTime = '-/-';
            this.lastBreakStart = '-/-';
            this.lastBreakEnd = '-/-';
            this.state = ProgramState.ArbeitEnde;
        } else {
            this.workday = wd;
            this.state = ProgramState.ArbeitEnde;
            this.startTime = '-/-';
            this.endTime = '-/-';
            this.lastBreakStart = '-/-';
            this.lastBreakEnd = '-/-';

            if (this.workday.dailyEvents !== undefined) {

                if (this.workday.dailyEvents.find(de => de.eventType === ProgramState.ArbeitStart) !== undefined) {
                    this.state = ProgramState.ArbeitStart;
                    const evnt = this.workday.dailyEvents.find(de => de.eventType === ProgramState.ArbeitStart);
                    this.startTime = evnt.time.toString();
                }
                if (this.workday.dailyEvents.find(de => de.eventType === ProgramState.PauseStart) !== undefined) {
                    this.state = ProgramState.PauseStart;
                    var index = this.workday.dailyEvents.filter(de => de.eventType === ProgramState.PauseStart).length - 1;
                    const evnt = this.workday.dailyEvents.filter(de => de.eventType === ProgramState.PauseStart)[index];
                    this.lastBreakStart = evnt.time.toString();
                }
                if (this.workday.dailyEvents.find(de => de.eventType === ProgramState.PauseEnde) !== undefined) {
                    var indexStart = this.workday.dailyEvents.filter(de => de.eventType === ProgramState.PauseStart).length - 1;
                    var index = this.workday.dailyEvents.filter(de => de.eventType === ProgramState.PauseEnde).length - 1;
                    const evnt = this.workday.dailyEvents.filter(de => de.eventType === ProgramState.PauseEnde)[index];
                    this.lastBreakEnd = evnt.time.toString();
                    this.state = indexStart === index ? ProgramState.PauseEnde : ProgramState.PauseStart;
                    this.workday.TotalBreakTime = DurationFactory.GetDurationOfAllBreaks(this.workday);
                }
                if (this.workday.dailyEvents.find(de => de.eventType === ProgramState.ArbeitEnde) !== undefined) {
                    this.state = ProgramState.ArbeitEnde;
                    const evnt = this.workday.dailyEvents.find(de => de.eventType === ProgramState.ArbeitEnde)
                    this.endTime = evnt.time.toString();
                    this.workday.TotalWorktime = DurationFactory.GetWorkDuration(this.workday);
                }
            } else {
                this.workday.dailyEvents = new Array<DailyEvent>();
            }

        }

    }

    static load(wd?: Workday): ZeiterfassungDataModel {
        if (wd === null) {
            return new ZeiterfassungDataModel(undefined);
        }
        return new ZeiterfassungDataModel(wd);
    }

    updateTotalTimes() {
        if (this.workday.dailyEvents.find(de => de.eventType === ProgramState.PauseEnde) !== undefined) {
            this.workday.TotalBreakTime = DurationFactory.GetDurationOfAllBreaks(this.workday);
        }
        if (this.workday.dailyEvents.find(de => de.eventType === ProgramState.ArbeitEnde) !== undefined) {
            this.workday.TotalWorktime = DurationFactory.GetWorkDuration(this.workday);
        }
    }
}