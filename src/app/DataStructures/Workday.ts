    class Workday {
        Date: Date;
        DailyEvents: Array<DailyEvent>;

        TotalWorktime: Duration;
        TotalBreakTime: Duration;

        Type: WorkdayType;

        constructor(vacationday?: VacationdayModel) {
            if (vacationday === null) {
                this.TotalWorktime = new Duration();
                this.TotalBreakTime = new Duration();
                this.Type = WorkdayType.Arbeitstag;
            } else {
                this.Date = new Date(vacationday.date);
                this.Type = vacationday.GetWorkdayType();
                this.TotalBreakTime = new Duration();
                if (this.Type === WorkdayType.FeiertagGanz || this.Type === WorkdayType.UrlaubGanz) {
                    this.TotalWorktime = new Duration();
                    this.TotalWorktime.Hours = 8;
                    this.TotalWorktime.Minutes = 0;
                }
                if (this.Type === WorkdayType.FeiertagHalb || this.Type === WorkdayType.UrlaubHalb) {
                    this.TotalWorktime = new Duration();
                    this.TotalWorktime.Hours = 4;
                    this.TotalWorktime.Minutes = 0;
                }
                this.DailyEvents = new Array<DailyEvent>();
            }
        }

        ToString() {
            let retVal = this.Date.toString() + '\tArbeitszeit: ' + this.TotalWorktime;
            switch (this.Type) {
                case WorkdayType.Arbeitstag: {
                        retVal += '\t WD';
                        break;
                    }
                case WorkdayType.FeiertagGanz: {
                        retVal += '\t HD';
                        break;
                    }
                case WorkdayType.FeiertagHalb: {
                        retVal += '\t HD/2';
                        break;
                    }
                case WorkdayType.UrlaubGanz: {
                        retVal += '\t V';
                        break;
                    }
                case WorkdayType.UrlaubHalb: {
                        retVal += '\t V/2';
                        break;
                    }
            }
            return retVal;
        }
    }
