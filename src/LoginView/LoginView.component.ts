import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginViewDataModel } from 'src/ViewDataModels/LoginViewDataModel';
import { User } from 'src/app/DataStructures/User';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/User.service';


@Component({
  selector: 'app-LoginView',
  templateUrl: './LoginView.component.html',
  styleUrls: ['./LoginView.component.css']
})
export class LoginViewComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onLoginStatusChanged = new EventEmitter<User>();
  title = 'Willkommen bei ClockR';
  dataModel: LoginViewDataModel;
  loginFailed: boolean;
  //allUsers: Observable<User[]>;
  allUsers: User[];

  constructor(private userService: UserService) {
    this.loginFailed = false;

  }

  ngOnInit() {
    this.dataModel = LoginViewDataModel.load();
    this.userService.getUsersList().subscribe(data => this.allUsers = data);
  }

  OnLoginTry() {
    console.log("LoginView. All Users:");
    console.log(this.allUsers);
    var possibleUser;
    possibleUser = this.allUsers.find(el => el.password === this.dataModel.password && el.username === this.dataModel.username);
    if (possibleUser !== undefined) {
      this.onLoginStatusChanged.emit(possibleUser);
    } else {
      this.loginFailed = true;
    }
  }
    /*
    this.allUsers.subscribe(data => console.log(data));
    var possibleUser;
    this.allUsers.subscribe((data) => possibleUser = data.find(el => el.password === this.dataModel.password && el.username === this.dataModel.username));

    if (possibleUser !== undefined) {
      this.onLoginStatusChanged.emit(possibleUser);
    } else {
      this.loginFailed = true;
    }
  }

  /*
  this.allUsers.forEach(el => console.log(el));
  var possibleUser;
  this.allUsers.forEach(el => {
    possibleUser = el.find(e => e.password === this.dataModel.password && e.username === this.dataModel.username);
    if (possibleUser !== undefined) {
      this.onLoginStatusChanged.emit(possibleUser as User);
    } else {
      this.loginFailed = true;
    }
  });*/

}
