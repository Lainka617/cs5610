import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service.client';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {}

    canActivate(): boolean {
        let result;
        this.userService.loggedIn().subscribe(
            (user: any) => {
                if (user !== 0) {
                    this.sharedService.user = user;
                    result = true;
                } else {
                    this.router.navigate(['/login']);
                    result = false;
                }
            }
        );
        return result;
    }
}
