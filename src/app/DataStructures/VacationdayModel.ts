import { WorkdayType } from './WorkdayType';

export class VacationdayModel {
    date: Date;
    isHoliday: boolean;
    isHalfHoliday: boolean;
    isVacationday: boolean;
    isHalfVacationday: boolean;

    toString() {
        const dow = this.date.toLocaleDateString('DE-de', { weekday: 'long' });
        let retVal = dow + ',' + this.date.getDate().toString().padStart(2, '0') + '.';
        retVal += this.date.getMonth().toString().padStart(2, '0') + '.' + this.date.getFullYear();
        return retVal;
    }

    GetWorkdayType() {
        if (this.isVacationday) {
            return WorkdayType.UrlaubGanz;
        } else if (this.isHalfVacationday) {
            return WorkdayType.UrlaubHalb;
        } else if (this.isHalfHoliday) {
            return WorkdayType.FeiertagHalb;
        } else {
            return WorkdayType.FeiertagGanz;
        }
    }
}
