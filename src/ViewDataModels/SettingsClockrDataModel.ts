import { User } from 'src/app/DataStructures/User';

export class SettingsClockrDataModel {
    clockrHandle: string;
    arbeitStartClockr: string;
    pauseStartClockr: string;
    pauseEndeClockr: string;
    arbeitEndeClockr: string;

    constructor(user?: User) {
        if(user === undefined) {
            this.clockrHandle = undefined;
            this.arbeitStartClockr = undefined;
            this.pauseStartClockr = undefined;
            this.pauseEndeClockr = undefined;
            this.arbeitEndeClockr = undefined;
        } else {
            this.clockrHandle = user.handle;
            this.arbeitStartClockr = user.workStartClockrMessage;
            this.pauseStartClockr = user.breakStartClockrMessage;
            this.pauseEndeClockr = user.breakEndClockrMessage;
            this.arbeitEndeClockr = user.workEndClockrMessage;
        }
    }
}
