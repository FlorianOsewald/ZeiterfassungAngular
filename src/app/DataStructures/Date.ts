export class WorkdayDate {
    day: number;
    month: number;
    year: number;

    constructor(dateTime: Date) {
        if (dateTime != null) {
            this.day = dateTime.getDay();
            this.month = dateTime.getMonth();
            this.year = dateTime.getFullYear();
        }
    }

    isBiggerThan(date: WorkdayDate) {
        if (this.year > date.year) {
            return true;
        }
        if (this.year === date.year && this.month > date.month) {
            return true;
        }
        if (this.year === date.year && this.month === date.month && this.day > date.day) {
            return true;
        } else {
            return false;
        }
    }

    isSameDateAs(date: WorkdayDate) {
        return this.year === date.year && this.month === date.month && this.day === date.day;
    }

    toString() {
        let retVal = '';
        retVal += String(this.day).padStart(2, '0');
        retVal += '.' + String(this.month).padStart(2, '0');
        retVal += '.' + String(this.year).padStart(4, '0');
        return retVal;
    }

    matchesDateTime(dateTime: Date) {
        if (this.day === dateTime.getDay() && this.month === dateTime.getMonth() && this.year === dateTime.getFullYear()) {
            return true;
        } else {
            return false;
        }
    }
}