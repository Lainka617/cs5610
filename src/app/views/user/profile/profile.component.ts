import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
// import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userId: string;
  username: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  // faUser = faUser;
  // faCheck = faCheck;

  constructor(private _userService: UserService, private _router: ActivatedRoute, private router: Router) {

  }

  updateUser() {
    this._userService.updateUser(new User(this.userId, this.username, this.user.password, this.userFirstName, this.userLastName, this.userEmail)).subscribe(
        (user: User) => {
            this.user = user;
            this.username = this.user.username;
            this.userEmail = this.user.email;
            this.userFirstName = this.user.firstName;
            this.userLastName = this.user.lastName;
        },
        (error: any) => {
            console.log(error);
        });
  }

  deleteUser(){
      this._userService.deleteUserById(this.userId).subscribe(
          (data: any) => {
              this.router.navigate(['/register']);
          }
      );
  }

  ngOnInit() {
    this._router.params.subscribe(params => {
      return this._userService.findUserById(params['uid']).subscribe(
          (user: User) => {
            this.user = user;
            this.userId = user._id;
            this.username = this.user.username;
            this.userEmail = this.user.email;
            this.userFirstName = this.user.firstName;
            this.userLastName = this.user.lastName;
          },
          (error: any) => {
              console.log(error);
          }
      );
    });
  }

  logout() {
    this._userService.logout().subscribe(
      (data: any) => {
        this.router.navigate(['/login']);
      }
    );
  }
}
