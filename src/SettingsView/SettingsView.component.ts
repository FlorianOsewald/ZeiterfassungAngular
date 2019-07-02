import { UserRole } from './../app/DataStructures/User-Role.enum';
import { UserService } from 'src/app/Services/User.service';
import { SettingsDataModel } from './../ViewDataModels/SettingsDataModel';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/DataStructures/User';
import { IUser } from 'src/app/DataStructures/IUser';

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
  passwordsChangedSuccess: boolean;
  statusString: string;
  newUserCreatedSuccess: boolean;
  @Input() currentUser: User;

  userIsAdmin: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('OnInit von SettingsView. CurrentUser: ');
    console.log(this.currentUser);
    this.settings = SettingsDataModel.load(this.currentUser);

    this.userIsAdmin = this.currentUser.userRolle === UserRole.Admin;
    

    this.passwordsDontMatch = false;
    this.notAllDataEntered = false;
    this.invalidUserRoleEntered = false;
    this.usernameIsNotUnique = false;
    this.passwordsChangedSuccess = false;
    this.newUserCreatedSuccess = false;
    this.statusString = '';
  }

  onSaveDetails() {
    this.currentUser.anrede = this.settings.settingsDetailDataModel.isMaleAnrede ? 'Herr' : 'Frau';
    this.currentUser.vorname = this.settings.settingsDetailDataModel.vorname;
    this.currentUser.nachname = this.settings.settingsDetailDataModel.nachname;
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(data => console.log(new User(data)));
  }

  onSaveClockR() {
    this.currentUser.handle = this.settings.settingsClockrDataModel.clockrHandle;
    this.currentUser.workStartClockrMessage = this.settings.settingsClockrDataModel.arbeitStartClockr;
    this.currentUser.breakStartClockrMessage = this.settings.settingsClockrDataModel.pauseStartClockr;
    this.currentUser.breakEndClockrMessage = this.settings.settingsClockrDataModel.pauseEndeClockr;
    this.currentUser.workEndClockrMessage = this.settings.settingsClockrDataModel.arbeitEndeClockr;
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(data => console.log(new User(data)));
  }

  onSaveUser() {
    if (this.passwordsMatch()) {
      this.currentUser.username = this.settings.settingsUserDataModel.username;
      this.currentUser.password = this.settings.settingsUserDataModel.confirmedPassword;
      this.passwordsDontMatch = false;
      this.passwordsChangedSuccess = true;
      this.statusString = 'Password has been updated successfully';
      this.settings.settingsUserDataModel.confirmedPassword = '';
      this.settings.settingsUserDataModel.newPassword = '';
      this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(data => console.log(new User(data)));
    } else {
      this.passwordsDontMatch = true;
      this.passwordsChangedSuccess = false;
      this.settings.settingsUserDataModel.confirmedPassword = '';
      this.settings.settingsUserDataModel.newPassword = '';
      this.statusString = 'Passwords dont Match.';
    }
  }

  onSaveAdmin() {
    if (this.neccessaryUserDataAvailable()) {
      this.notAllDataEntered = false;
      if (this.detectUserRole() !== undefined) {
        this.invalidUserRoleEntered = false;
        this.usernameIsNotUnique = false;
        const newUser = new User();
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
        this.userService.CreateUser(newUser).subscribe(data => {
          if (data !== null) {
            console.log(new User(data));
            this.newUserCreatedSuccess = true;
            this.statusString = 'User wurde erfolgreich angelegt!';
            this.settings.settingsAdminDataModel.username = undefined;
            this.settings.settingsAdminDataModel.password = undefined;
            this.settings.settingsAdminDataModel.userRole = undefined;
          } else {
            this.usernameIsNotUnique = true;
            this.statusString = 'Username ist schon vergeben!';
          }
      });
      } else {
        this.invalidUserRoleEntered = true;
        this.statusString = 'Ungültige Userrolle eingetragen';
      }

    } else {
      this.notAllDataEntered = true;
      this.statusString = 'Notwendige Daten nicht komplett eingetragen';
    }
  }

  passwordsMatch(): boolean {
    return this.settings.settingsUserDataModel.newPassword === this.settings.settingsUserDataModel.confirmedPassword;
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
