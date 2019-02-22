import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userId: string;
  username: string;
  faUser = faUser;
  faCheck = faCheck;

  constructor(private _userService: UserService, private _router: ActivatedRoute) {

  }

  UpdateUser() {
    console.log(this.user.username);
    console.log(this.user.firstName);
    console.log(this.user.lastName);
  }

  ngOnInit() {
    this._router.params.subscribe(params => {
      this.userId = params['uid'];
      this.user = this._userService.findUserById(this.userId);
      console.log('user id: ' + this.userId);
    });

    this.user = this._userService.findUserById(this.userId);
    this.username = this.user['username'];
  }
}
