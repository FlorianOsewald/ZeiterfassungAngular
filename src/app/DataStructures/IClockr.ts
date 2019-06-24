import { User } from './User';

export interface IClockr {
    id: number;
    message: string;
    user: User;
    time: Date;

    toString();
}
