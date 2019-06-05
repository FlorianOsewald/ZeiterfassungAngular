import { DailyEvent } from '../DataStructures/DailyEvent';
import { ProgramState } from '../DataStructures/ProgramState';
import { Timestamp } from '../DataStructures/Timestamp';

export class DailyEventFactory {
    static GetArbeitsstartEvent(fromString: string): DailyEvent {
        const start = new DailyEvent();
        start.eventType = ProgramState.ArbeitStart;
        start.time = DailyEventFactory.GetTimeStampFromText(fromString);
        return start;
    }

    static GetArbeitEndeEvent(fromString: string): DailyEvent {
        const ende = new DailyEvent();
        ende.eventType = ProgramState.ArbeitEnde;
        ende.time = DailyEventFactory.GetTimeStampFromText(fromString);
        return ende;
    }
    static GetTimeStampFromText(text: string): Timestamp {
        if (text.charAt(text.length - 1) === ';') {
            text = text.slice(0, -1);
        }
        const tbText = text.split(':');
        const retVal = new Timestamp();
        retVal.hours = Number.parseInt(tbText[0], 10);
        retVal.minutes = Number.parseInt(tbText[1], 10);
        return retVal;
    }

    static GetAllBreakEvents(fromString: string) {
        const allBreaks = new Array<DailyEvent>();
        const breaks = fromString.split(';');
        // breaks now contains all breaks in a format start-end
        for (const singleBreak of breaks) {
            const breakTime = singleBreak.split('-');

            // breakTime has now [0] start, and [1] end
            const breakStart = breakTime[0].split(':');
            const breakEnd = breakTime[1].split(':');

            const brkStartTime = new Timestamp();
            brkStartTime.hours = Number.parseInt(breakStart[0], 10)
            brkStartTime.minutes = Number.parseInt(breakStart[1], 10);
            const brkStartEvnt = new DailyEvent();
            brkStartEvnt.eventType = ProgramState.PauseStart;
            brkStartEvnt.time = brkStartTime;
            allBreaks.push(brkStartEvnt);

            const brkEndTime = new Timestamp();
            brkEndTime.hours = Number.parseInt(breakEnd[0], 10);
            brkEndTime.minutes = Number.parseInt(breakEnd[1], 10);

            const brkEndEvnt = new DailyEvent();
            brkEndEvnt.eventType = ProgramState.PauseEnde;
            brkEndEvnt.time = brkEndTime;
            allBreaks.push(brkEndEvnt);
        }
        return allBreaks;
    }
}

