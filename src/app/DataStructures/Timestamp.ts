export class Timestamp {
    hours: number;
    minutes: number;

    constructor(dateTime?: Date) {
        if(dateTime !== undefined) {
        this.hours = dateTime.getHours();
        this.minutes = dateTime.getMinutes();
        } else {
            this.hours = 0;
            this.minutes = 0;
        }
    }

    toString() {
        return this.hours.toString().padStart(2, '0') + ':' + this.minutes.toString().padStart(2, '0');
    }

}

