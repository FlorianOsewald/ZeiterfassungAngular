import { DurationFactory } from './../app/AddOns/DurationFactory';
import { DailyEventFactory } from './../app/AddOns/DailyEventFactory';
import { ProgramState } from './../app/DataStructures/ProgramState';
import { Workday } from 'src/app/DataStructures/Workday';
import { DailyEvent } from 'src/app/DataStructures/DailyEvent';

export class CorrectionsDataModel {
    workdays: Array<Workday>;
    filteredDays: Array<Workday>;
    selectedDay: Workday;
    selectedDayBackUp: Workday;
    selectedDayStartTimeString: string;
    selectedDayEndTimeString: string;
    selectedDayAllBreaksString: string;

    constructor(workdays?: Array<Workday>) {

        if (workdays === undefined) {
            this.workdays = new Array<Workday>();
            this.filteredDays = new Array<Workday>();
        } else {
            console.log("In CorrectionsDatamodel. Checking Workdays");
            workdays.forEach(wd => {

                if (wd.getArbeitEnde() !== undefined) {
                    wd.TotalBreakTime = DurationFactory.GetDurationOfAllBreaks(wd);
                    wd.TotalWorktime = DurationFactory.GetWorkDuration(wd);
                }
            });

            workdays.sort( function (a, b) {
                if(a.date > b.date) {
                    return -1;
                }
                if(a.date < b.date) {
                    return 1;
                } else {
                    return 0;
                }
            });

            this.workdays = workdays;
            this.filteredDays = workdays;
        }
    }

    static load(workdays?: Array<Workday>) {

        if (workdays === null || workdays === undefined) {
            return new CorrectionsDataModel(undefined);
        } else {
            return new CorrectionsDataModel(workdays);
        }
    }

    deleteWorkday(wd: Workday) {
        const index = this.workdays.indexOf(wd, 0);
        if (index > -1) {
            this.workdays.splice(index, 1);
        }
        this.resyncArrays();
    }

    modifyWorkday(wd: Workday) {
        const index = this.workdays.indexOf(wd, 0);
        if (index > -1) {
            if (this.selectedDayStartTimeString !== '' || this.selectedDayEndTimeString !== '' || this.selectedDayAllBreaksString !== '') {
                this.workdays[index].dailyEvents = new Array<DailyEvent>();

                if (this.selectedDayStartTimeString !== '') {
                    const startEvent = DailyEventFactory.GetArbeitsstartEvent(this.selectedDayStartTimeString);
                    this.workdays[index].dailyEvents.push(startEvent);
                }

                if (this.selectedDayEndTimeString !== '') {
                    const endeEvent = DailyEventFactory.GetArbeitEndeEvent(this.selectedDayEndTimeString);
                    this.workdays[index].dailyEvents.push(endeEvent);
                }

                if (this.selectedDayAllBreaksString !== '') {
                    DailyEventFactory.GetAllBreakEvents(this.selectedDayAllBreaksString).forEach(element => {
                        this.workdays[index].dailyEvents.push(element);
                    });
                    this.workdays[index].TotalBreakTime = DurationFactory.GetDurationOfAllBreaks(this.workdays[index]);
                }

                if (this.selectedDayEndTimeString !== '' && this.selectedDayStartTimeString !== '') {
                    this.workdays[index].TotalWorktime = DurationFactory.GetWorkDuration(this.workdays[index]);
                }
            }
            this.resyncArrays();
            this.setSelectedWorkday(wd);
        }
    }

    revertWorkday() {
        this.selectedDayStartTimeString = this.selectedDayBackUp.getArbeitStart() === undefined ? '' : this.selectedDayBackUp.getArbeitStart().time.toString();
        this.selectedDayEndTimeString = this.selectedDayBackUp.getArbeitEnde() === undefined ? '' : this.selectedDayBackUp.getArbeitEnde().time.toString();
        this.selectedDayAllBreaksString = this.selectedDayBackUp.getPausenZeiten();
    }

    setSelectedWorkday(wd: Workday) {
        this.selectedDay = wd;
        this.selectedDayBackUp = wd;
        this.selectedDayStartTimeString = wd.getArbeitStart() === undefined ? '' : wd.getArbeitStart().time.toString();
        this.selectedDayEndTimeString = wd.getArbeitEnde() === undefined ? '' : wd.getArbeitEnde().time.toString();
        this.selectedDayAllBreaksString = wd.getPausenZeiten();
    }

    filterWorkdays(filter: string) {
        this.filteredDays = this.workdays.filter(element => {
            const dateString = element.date.toLocaleDateString();
            if (dateString.indexOf(filter) > -1) {
                return true;
            }
        });
    }

    resetFilter() {
        this.resyncArrays();
    }

    manageFiltering(input: string) {
        if (input === '') {
            this.resetFilter();
        } else {
            this.filterWorkdays(input);
        }
    }

    resyncArrays() {
        this.filteredDays = this.workdays;
    }
}
