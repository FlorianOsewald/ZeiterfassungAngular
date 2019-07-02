import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginViewDataModel } from 'src/ViewDataModels/LoginViewDataModel';
import { User } from 'src/app/DataStructures/User';
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


  constructor(private userService: UserService) {
    this.loginFailed = false;

  }

  ngOnInit() {
    this.dataModel = LoginViewDataModel.load();
  }

  OnLoginTry() {

    let newUser = new User();
    newUser.password = this.dataModel.password;
    newUser.username = this.dataModel.username;

    this.userService.postUserToLogIn(newUser).subscribe((data) => {

        newUser = new User(data);

        this.onLoginStatusChanged.emit(newUser);
      }, (err) => {
        this.loginFailed = true;
      });
  }
}
