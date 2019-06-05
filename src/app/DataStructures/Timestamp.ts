export class Timestamp {
    hours: number;
    minutes: number;

    constructor(dateTime?: Date) {
        this.hours = dateTime.getHours();
        this.minutes = dateTime.getMinutes();
    }

    toString() {
        return this.hours.toString().padStart(2, '0') + ':' + this.minutes.toString().padStart(2, '0');
    }

}

