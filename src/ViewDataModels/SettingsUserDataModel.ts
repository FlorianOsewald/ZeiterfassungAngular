import { User } from 'src/app/DataStructures/User';

export class SettingsUserDataModel {
    username: string;
    newPassword: string;
    confirmedPassword: string;

    constructor(user?: User) {
        this.username = user === undefined ? undefined : user.username;
        this.newPassword = undefined;
        this.confirmedPassword = undefined;
    }
}
