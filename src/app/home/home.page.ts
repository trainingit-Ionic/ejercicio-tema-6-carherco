import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users$: Observable<User[]>;
  
  constructor(private userService: UserService, private router: Router, private callNumber: CallNumber) {
    this.users$ = this.userService.get();
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

  viewUser(user: User) {
    this.router.navigate([`/detail/${user.id}`]);
  }

}
