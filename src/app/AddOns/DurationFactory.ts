import { DailyEvent } from '../DataStructures/DailyEvent';
import { Duration } from '../DataStructures/Duration';
import { Workday } from '../DataStructures/Workday';
import { ProgramState } from '../DataStructures/ProgramState';

export class DurationFactory {
    static GetBreakDuration(breakStart: DailyEvent, breakEnd: DailyEvent) {
        // Since breakEnd will Always be AFTER breakStart, we can just return breakEnd.Time - breakStart.Time
        const dur1 = new Duration();
        dur1.Hours = breakEnd.time.hours;
        dur1.Minutes = breakEnd.time.minutes;
        const dur2 = new Duration();
        dur2.Hours = breakStart.time.hours;
        dur2.Minutes = breakStart.time.minutes;
        return DurationFactory.SubstractDurations(dur1, dur2);
    }

    static GetDurationOfAllBreaks(workday: Workday) {
        let allBreaksDuration = new Duration();

        const allBreakStarts = workday.DailyEvents.filter(item => item.eventType.toString() === 'PauseStart');

        const allBreakEnds = workday.DailyEvents.filter(item => item.eventType.toString() === 'PauseEnde');

        if (allBreakStarts.length === allBreakEnds.length) {
            for (let i = 0; i < allBreakEnds.length; i++) {
                const breakDuration = DurationFactory.GetBreakDuration(allBreakStarts[i], allBreakEnds[i]);
                allBreaksDuration = DurationFactory.AddUpDurations(allBreaksDuration, breakDuration);
            }
        } else {
            // Do nothing i guess;
        }
        return allBreaksDuration;
    }

    static GetWorkDuration(workday: Workday) {
        // First WorkEnd - WorkStart. Then add up ALL breaks, check if theyre bigger than 45m and subtract the breaktime from worktime. Then Round to fine number
        const startWork = workday.DailyEvents.find(item => item.eventType.toString() === 'ArbeitStart');

        const endWork = workday.DailyEvents.find(item => item.eventType.toString() === 'ArbeitEnde');

        // The method does exactly what we need, so dont get confused by its name
        const totalWorkTimePreBreaks = DurationFactory.GetBreakDuration(startWork, endWork);

        const minBreakDur = new Duration();
        minBreakDur.Hours = 0;
        minBreakDur.Minutes = 45;

        const breakTimeToSubtract = DurationFactory.GetBiggerDuration(minBreakDur, workday.TotalBreakTime);

        const totalWorkTimePostBreaks = DurationFactory.SubstractDurations(breakTimeToSubtract, totalWorkTimePreBreaks);

        return DurationFactory.RoundToFineDuration(totalWorkTimePostBreaks);
    }

    static AddUpDurations(duration1: Duration, duration2: Duration) {
        let totalHours = duration1.Hours + duration2.Hours;
        let totalMinutes = duration1.Minutes + duration2.Minutes;

        while (totalMinutes >= 60) {
            totalMinutes -= 60;
            totalHours++;
        }

        const retVal = new Duration();
        retVal.Hours = totalHours;
        retVal.Minutes = totalMinutes;

        return retVal;
    }

    static SubstractDurations(duration1: Duration, duration2: Duration) {
        // Make sure that d1 is bigger than d2

        if (duration2 === DurationFactory.GetBiggerDuration(duration1, duration2)) {
            const tmp = duration1;
            duration1 = duration2;
            duration2 = tmp;
        }
        let totalHours = duration1.Hours - duration2.Hours;
        let totalMinutes = duration1.Minutes - duration2.Minutes;

        if (totalMinutes < 0) {
            totalHours--;
            totalMinutes = 60 + totalMinutes;
        }

        const retVal = new Duration();
        retVal.Hours = totalHours;
        retVal.Minutes = totalMinutes;
        return retVal;
    }

    public static GetBiggerDuration(duration1: Duration, duration2: Duration) {
        if (duration1.Hours > duration2.Hours) {
            return duration1;
        } else if (duration2.Hours > duration1.Hours) {
            return duration2;
        } else {
            if (duration1.Minutes > duration2.Minutes) {
                return duration1;
            } else {
                return duration2;
            }
        }
    }

    public static RoundToFineDuration(duration: Duration) {
        /**
         * 0-14m = runter auf 0
         * 15-23m= 15
         * 24-44m = 30
         * 45-56m = 45
         * 57-59 = rauf auf 0
         */

        if (duration.Minutes >= 57) {
            duration.Minutes = 0;
            duration.Hours++;
        } else if (duration.Minutes >= 45 && duration.Minutes <= 56) {
            duration.Minutes = 45;
        } else if (duration.Minutes >= 24 && duration.Minutes <= 44) {
            duration.Minutes = 30;
        } else if (duration.Minutes >= 15 && duration.Minutes <= 23) {
            duration.Minutes = 15;
        } else if (duration.Minutes >= 0 && duration.Minutes <= 14) {
            duration.Minutes = 0;
        }

        return duration;
    }
}

