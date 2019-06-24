import { UserRole } from './User-Role.enum';
import { Clockr } from './Clockr';
import { IUser } from './IUser';


export class User implements IUser {

    id: number;
    username: string;
    password: string;
    userRolle: UserRole;
    profilePicture: string;
    workStartClockrMessage: string;
    breakStartClockrMessage: string;
    breakEndClockrMessage: string;
    workEndClockrMessage: string;
    vorname: string;
    nachname: string;
    anrede: string;
    handle: string;
    clockrs: Array<Clockr>;

    constructor(user ?: IUser) {
        if (user !== undefined) {
            this.id = user.id;
            this.username = user.username;
            this.password = user.password;
            this.userRolle = UserRole[user.userRolle.toString()];
            this.profilePicture = user.profilePicture;
            this.workStartClockrMessage = user.workStartClockrMessage;
            this.breakStartClockrMessage = user.breakStartClockrMessage;
            this.breakEndClockrMessage = user.breakEndClockrMessage;
            this.workEndClockrMessage = user.workEndClockrMessage;
            this.vorname = user.vorname;
            this.nachname = user.nachname;
            this.anrede = user.anrede;
            this.handle = user.handle;
            this.clockrs = user.clockrs;
        }
    }

    toString() {
        return "Hi, my name is: " + this.vorname + " " + this.nachname;
    }
}
