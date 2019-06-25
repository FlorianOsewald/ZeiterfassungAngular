import { Clockr } from 'src/app/DataStructures/Clockr';
import { User } from 'src/app/DataStructures/User';

export class WallViewDataModel {
    filteredClockRs: Array<Clockr>;
    newClockr: Clockr;

    constructor(clockrs ?: Array<Clockr>, sessionUser?: User) {

       this.filteredClockRs = clockrs === undefined ?  new Array<Clockr>() : clockrs;

       this.filteredClockRs.sort( function (a, b) {
        if(a.time > b.time) {
            return -1;
        }
        if(a.time < b.time) {
            return 1;
        } else {
            return 0;
        }
    });

        this.newClockr = new Clockr();
    }

    static load(clockrs ?: Array<Clockr>, user ?: User) {
        console.log("in load Wall with clockrs: " + clockrs);

        return new WallViewDataModel(clockrs, user);
    }

    sendClockr(byUser: User) : Clockr {
        const nClcr = new Clockr();
        nClcr.time = new Date();
        nClcr.user = byUser;
        nClcr.message = this.newClockr.message;
        this.filteredClockRs.push(nClcr);
        this.newClockr.message = '';

        this.filteredClockRs.sort( function (a,b) {
            if(a.time > b.time) {
                return -1;
            }
            if(a.time < b.time) {
                return 1;
            } else {
                return 0;
            }
        });
        return nClcr;
    }

    changeProfilePicture(filename: string, forUser: User) {
        forUser.profilePicture = './assets/' + filename;
    }
}
