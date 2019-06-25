import { ITimestamp } from './ITimestamp';

export class Timestamp implements ITimestamp {
    hours: number;
    minutes: number;

    constructor(dateTime?: Date, timestamp?: ITimestamp) {
        if(dateTime !== undefined) {
        this.hours = dateTime.getHours();
        this.minutes = dateTime.getMinutes();
        } else if (timestamp !== undefined ) {
            this.hours = timestamp.hours;
            this.minutes = timestamp.minutes;
        } else {
            this.hours = 0;
            this.minutes = 0;
        }
    }

    toString() {
        return this.hours.toString().padStart(2, '0') + ':' + this.minutes.toString().padStart(2, '0');
    }

}

