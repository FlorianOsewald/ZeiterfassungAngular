import { SettingsAdminDataModel } from './SettingsAdminDataModel';
import { SettingsUserDataModel } from './SettingsUserDataModel';
import { SettingsClockrDataModel } from './SettingsClockrDataModel';
import { SettingsDetailDataModel } from './SettingsDetailDataModel';
import { User } from 'src/app/DataStructures/User';

export class SettingsDataModel {
    settingsDetailDataModel: SettingsDetailDataModel;
    settingsClockrDataModel: SettingsClockrDataModel;
    settingsUserDataModel: SettingsUserDataModel;
    settingsAdminDataModel: SettingsAdminDataModel;


    constructor(user?: User) {
        console.log("In SettingsDataModel. User uebergeben: ");
        console.log(user);
        this.settingsDetailDataModel = new SettingsDetailDataModel(user);
        this.settingsClockrDataModel = new SettingsClockrDataModel(user);
        this.settingsUserDataModel = new SettingsUserDataModel(user);
        this.settingsAdminDataModel = new SettingsAdminDataModel(user);

        console.log(this.settingsDetailDataModel);
    }

    static load(user: User) {
        return new SettingsDataModel(user);
    }
}
