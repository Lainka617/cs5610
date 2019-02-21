import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user.service.client";
import {Router} from "@angular/router";
import {User} from "../../../models/user.model.client";

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

  errorFlag: boolean;
  errorMsg = 'password is not correct !';

  constructor(private userService: UserService, private router: Router) {
    this.errorFlag = false;
  }


  login () {
    // fetching data from register form
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;
    alert(this.username);

    if (this.verifyPassword !== this.password) {
      this.errorFlag = true;
    } else {

      const user: User = new User('789', 'jian', 'hou', 'jian', 'hou', 'jian@123.com');
      this.userService.createUser(user);
      this.router.navigate(['/user', user._id]);
      console.log(this.username);
      console.log(this.password);
    }
  }

  ngOnInit() {
    console.log('register page!' + this.username);
  }


}
