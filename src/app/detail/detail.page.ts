import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute, private callNumber: CallNumber) {
    this.route.paramMap.pipe(
      switchMap( (paramMap: ParamMap) => this.userService.getOne(+paramMap.get('id')))
    ).subscribe(
      user => this.user = user
    );
    
  }

  ngOnInit() {
  }

  call(number) {
    this.callNumber.isCallSupported().then(
      isSupported => {
        if(isSupported) {
          this.callNumber.callNumber(number, false);
        }
      }
    );
    
  }

}
