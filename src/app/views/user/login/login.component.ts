import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  // properties
  username: string; // see usage as two-way data binding
  password: string; // see usage as two-way data binding

  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) {
    this.errorFlag = false;
  }


  login () {
    // fetching data from loginform
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    alert(this.username);

    let user;
    this.userService.findUserByCredential(this.username, this.password)
        .subscribe((userData: User) => {
          user = userData;
        });

    console.log(this.username);
    console.log(this.password);

    if (user) {
      this.router.navigate(['/user', user._id]);
    } else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {
    console.log('login page!' + this.username);
  }

}
