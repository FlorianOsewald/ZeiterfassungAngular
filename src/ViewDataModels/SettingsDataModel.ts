import { SettingsAdminDataModel } from './SettingsAdminDataModel';
import { SettingsUserDataModel } from './SettingsUserDataModel';
import { SettingsClockrDataModel } from './SettingsClockrDataModel';
import { SettingsDetailDataModel } from './SettingsDetailDataModel';

export class SettingsDataModel {
    settingsDetailDataModel: SettingsDetailDataModel;
    settingsClockrDataModel: SettingsClockrDataModel;
    settingsUserDataModel: SettingsUserDataModel;
    settingsAdminDataModel: SettingsAdminDataModel;


    constructor() {
        this.settingsDetailDataModel = { isMaleAnrede: true, vorname: 'Test', nachname: 'Lastname'}
        this.settingsClockrDataModel = new SettingsClockrDataModel();
        this.settingsUserDataModel = new SettingsUserDataModel();
        this.settingsAdminDataModel = new SettingsAdminDataModel();
    }

    static load() {
        return new SettingsDataModel();
    }
}
