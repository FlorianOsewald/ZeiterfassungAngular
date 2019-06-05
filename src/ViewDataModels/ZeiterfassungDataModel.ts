import { Workday } from 'src/app/DataStructures/Workday';
import { ProgramState } from 'src/app/DataStructures/ProgramState';

export class ZeiterfassungDataModel {
    workday: Workday;
    startTime: string;
    endTime: string;
    lastBreakStart: string;
    lastBreakEnd: string;
    state: ProgramState;

    constructor() {
        this.workday = new Workday();
        this.startTime = '-/-';
        this.endTime = '-/-';
        this.lastBreakStart = '-/-';
        this.lastBreakEnd = '-/-';
        this.state = ProgramState.ArbeitEnde;
    }

    static load() {
        return new ZeiterfassungDataModel();
    }
}