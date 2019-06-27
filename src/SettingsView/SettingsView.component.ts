import { UserRole } from './../app/DataStructures/User-Role.enum';
import { UserService } from 'src/app/Services/User.service';
import { SettingsDataModel } from './../ViewDataModels/SettingsDataModel';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/DataStructures/User';

@Component({
  selector: 'app-SettingsView',
  templateUrl: './SettingsView.component.html',
  styleUrls: ['./SettingsView.component.css']
})
export class SettingsViewComponent implements OnInit {
  title = 'Settings';
  settings: SettingsDataModel;
  passwordsDontMatch: boolean;
  notAllDataEntered: boolean;
  invalidUserRoleEntered: boolean;
  usernameIsNotUnique: boolean;
  @Input() currentUser: User;

  userIsAdmin: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log("OnInit von SettingsView. CurrentUser: ");
    console.log(this.currentUser);
    this.settings = SettingsDataModel.load(this.currentUser);

    this.userIsAdmin = this.currentUser.userRolle === UserRole.Admin;

    this.passwordsDontMatch = false;
    this.notAllDataEntered = false;
    this.invalidUserRoleEntered = false;
    this.usernameIsNotUnique = false;
  }

  onSaveDetails() {
    this.currentUser.anrede = this.settings.settingsDetailDataModel.isMaleAnrede ? 'Herr' : 'Frau';
    this.currentUser.vorname = this.settings.settingsDetailDataModel.vorname;
    this.currentUser.nachname = this.settings.settingsDetailDataModel.nachname;
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(data => console.log(data));
  }

  onSaveClockR() {
    this.currentUser.handle = this.settings.settingsClockrDataModel.clockrHandle;
    this.currentUser.workStartClockrMessage = this.settings.settingsClockrDataModel.arbeitStartClockr;
    this.currentUser.breakStartClockrMessage = this.settings.settingsClockrDataModel.pauseStartClockr;
    this.currentUser.breakEndClockrMessage = this.settings.settingsClockrDataModel.pauseEndeClockr;
    this.currentUser.workEndClockrMessage = this.settings.settingsClockrDataModel.arbeitEndeClockr;
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(data => console.log(data));
  }

  onSaveUser() {
    if (this.passwordsMatch() && this.usernameIsUnique(this.settings.settingsUserDataModel.username)) {
      this.currentUser.username = this.settings.settingsUserDataModel.username;
      this.currentUser.password = this.settings.settingsUserDataModel.confirmedPassword;
    } else {
      this.passwordsDontMatch = true;
    }
  }

  onSaveAdmin() {
    if (this.neccessaryUserDataAvailable()) {
      this.notAllDataEntered = false;
      if (this.usernameIsUnique(this.settings.settingsAdminDataModel.username)) {
        if (this.detectUserRole() !== undefined) {
          let newUser = new User();
          newUser.username = this.settings.settingsAdminDataModel.username;
          newUser.password = this.settings.settingsAdminDataModel.password;
          newUser.userRolle = this.detectUserRole();
          newUser.anrede = 'Herr';
          newUser.handle = '@' + newUser.username;
          newUser.workStartClockrMessage = newUser.username + ' ist gerade angekommen! #TimeForWorkBois';
          newUser.breakStartClockrMessage = newUser.username + ' ist jetzt in der Pause #OhneMampfKeinKampf';
          newUser.breakEndClockrMessage = newUser.username + ' ist jetzt aus der Pause zurück #Noch4Stunden';
          newUser.workEndClockrMessage = newUser.username + ' geht jetzt nach Hause! #AllesMauImStau';
          newUser.profilePicture = './assets/87141.png';
          this.userService.CreateUser(newUser).subscribe(data => console.log(data));
        } else {
          this.invalidUserRoleEntered = true;
        }
      } else {
        this.usernameIsNotUnique = true;
      }
    } else {
      this.notAllDataEntered = true;
    }
  }

  passwordsMatch(): boolean {
    return this.settings.settingsUserDataModel.newPassword === this.settings.settingsUserDataModel.confirmedPassword;
  }

  usernameIsUnique(usrname: string): boolean {
    let possibleUser;
    this.userService.getUserByUsername(usrname).subscribe((data: User) => {
      possibleUser = data;
    });
    return possibleUser === undefined;
  }

  neccessaryUserDataAvailable(): boolean {
    return this.settings.settingsAdminDataModel.username !== undefined &&
      this.settings.settingsAdminDataModel.password !== undefined &&
      this.settings.settingsAdminDataModel.userRole !== undefined;
  }

  detectUserRole(): UserRole {
    switch (this.settings.settingsAdminDataModel.userRole) {
      case 'Mitarbeiter': {
        return UserRole.Mitarbeiter;
      }
      case 'Arbeitgeber': {
        return UserRole.Arbeitgeber;
      }
      case 'Admin': {
        return UserRole.Admin;
      }
      default: {
        return undefined;
      }
    }
  }

}
