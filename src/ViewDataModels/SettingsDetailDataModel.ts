import { User } from 'src/app/DataStructures/User';

export class SettingsDetailDataModel {
    isMaleAnrede: boolean;
    vorname: string;
    nachname: string;

    constructor(user?: User) {
        if(user === undefined) {
            this.isMaleAnrede = true;
            this.vorname = undefined;
            this.nachname = undefined;
        } else {
            this.vorname = user.vorname;
            this.nachname = user.nachname;
            this.isMaleAnrede = user.anrede === 'Herr' ? true : false;
        }
    }
}
