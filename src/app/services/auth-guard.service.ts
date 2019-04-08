import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service.client';
import { SharedService } from './shared.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {}

    canActivate(): Observable<boolean> {
        return this.userService.loggedIn().pipe(
            map((user: any) => {
                if (user !== 0) {
                    this.sharedService.user = user;
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}
