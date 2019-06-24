import { User } from 'src/app/DataStructures/User';

export class SettingsAdminDataModel {
    username: string;
    password: string;
    userRole: string;

    constructor(user?: User) {
        this.username = undefined;
        this.password = undefined;
        this.userRole = undefined;
    }
}
