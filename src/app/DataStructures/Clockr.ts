import { IClockr } from './IClockr';
import { User } from './User';
import { IUser } from './IUser';
export class Clockr implements IClockr {
    id: number;
    message: string;
    user: User;
    time: Date;

    constructor(data?: IClockr) {
        if (data !== undefined) {
            this.id = data.id;
            this.message = data.message;
            this.time = new Date(data.time);
            var typedUser: IUser = JSON.parse(JSON.stringify(data.user));
            this.user = new User(typedUser);
        }
    }
    toString() {
        //Vorname Nachname (@Handle) DD.MM.YYYY HH:mm Uhr
        return this.user.vorname + ' ' + this.user.nachname + ' (' + this.user.handle + ') ' + this.time.toLocaleDateString() + ' ' + this.time.toLocaleTimeString();
    }
}
