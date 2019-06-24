import { IClockr } from './../app/DataStructures/IClockr';
import { UserService } from './../app/Services/User.service';
import { WallViewDataModel } from './../ViewDataModels/WallViewDataModel';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/DataStructures/User';
import { ClockrService } from 'src/app/Services/Clockr.service';
import { Clockr } from 'src/app/DataStructures/Clockr';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-WallView',
  styles: [
    ':host >>> span { color: #0e83cd; cursor: pointer; }'
  ],
  templateUrl: './WallView.component.html',
  styleUrls: ['./WallView.component.css'],
})
export class WallViewComponent implements OnInit {
  title = 'ClockR Feed';
  dataModel: WallViewDataModel;
  clockrCounter: number;

  @Input() currentUser: User;

  constructor(private clockrService: ClockrService, private userService: UserService) {
    this.dataModel = WallViewDataModel.load(undefined, this.currentUser);

  }

  ngOnInit() {

    var clockrARR = new Array<Clockr>();

    this.clockrService.getClockrList().subscribe(data => {
      data.forEach(clockr => {
        clockrARR.push(new Clockr(clockr));
      });
      this.dataModel = WallViewDataModel.load(clockrARR);
    });
    this.clockrService.getClockrByUser(this.currentUser.id).subscribe((data: Array<Clockr>) => this.clockrCounter = data.length);
  }


  uploadAvatar(fileInput: Event) {
    let file = (fileInput.target as HTMLInputElement).files[0];
    let fileName = file.name;
    this.dataModel.changeProfilePicture(fileName, this.currentUser);

    this.userService.updateUser(this.currentUser.id, this.currentUser);
  }


  sendClockr() {
    this.clockrService.createClockr(this.dataModel.sendClockr(this.currentUser)).subscribe(data => console.log(data));
    this.clockrCounter++;
  }


  getClockrToString(clockR: Clockr) {
    return clockR.toString();
  }

  getClockrImgString(clockr: Clockr) {
    return clockr.user.profilePicture;
  }

  getInjectedClockrMessage(text: string) {
    var repl = text.replace(/(^|\s)(#[a-z\d-]+)/ig, '$1<span>$2</span>');
    console.log(repl);
    return repl;
  }
}
