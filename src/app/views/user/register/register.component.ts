import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {getRandomId} from '../../../common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  // properties
  username: string; // see usage as two-way data binding
  password: string; // see usage as two-way data binding
  verifyPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  errorFlag: boolean;
  errorMsg = 'password is not correct !';

  constructor(private userService: UserService, private router: Router) {
    this.errorFlag = false;
  }


  register () {
    // fetching data from register form
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;
    this.firstName = this.registerForm.value.firstName;
    this.lastName = this.registerForm.value.lastName;
    this.email = this.registerForm.value.email;
    alert(this.username);

    if (this.verifyPassword !== this.password) {
      this.errorFlag = true;
    } else {
      // generate id for new user, just use 909 by now.
      // will add random unique id generating logic later
      const user: User = new User(getRandomId(1000), this.username, this.password, this.firstName, this.lastName, this.email);
      delete user._id;
      this.userService.createUser(user).subscribe(
          (userData: any) => {
            this.errorFlag = false;
            console.log(userData);
            this.router.navigate(['/user/', userData._id]);
          },
          (error: any) => {
            console.log(error);
            this.errorFlag = true;
          });
    }
  }

  ngOnInit() {
    console.log('register page!' + this.username);
  }


}
