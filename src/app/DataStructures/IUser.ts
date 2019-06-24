import { UserRole } from './User-Role.enum';
import { Clockr } from './Clockr';

export interface IUser {
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
}
