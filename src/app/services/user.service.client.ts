import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    api = {
        'createUser' : this.createUser,
        'login': this.login,
        'findUserByUsername' : this.findUserByUsername,
        'findUserById' : this.findUserById,
        'updateUser' : this.updateUser,
        'deleteUserById' : this.deleteUserById
    };

    createUser(user: User) {
        return this.http.post( environment.baseUrl + '/api/user/', user, {
            withCredentials: true
        });
    }

    login(username: string, password: string) {
        return this.http.post( environment.baseUrl + '/api/login', {
            username: username,
            password: password
        }, {
            withCredentials: true
        });
    }

    logout() {
        return this.http.post( environment.baseUrl + 'api/logout', '', {
            withCredentials: true
        });
    }

    loggedIn() {
        return this.http.post( environment.baseUrl + 'api/loggedin', '', {
            withCredentials: true
        });
    }

    findUserByUsername(username: string) {
        return this.http.get(environment.baseUrl + '/api/user?username' + username);
    }

    findUserById(userId: string) {
        return this.http.get( environment.baseUrl + '/api/user/' + userId);
    }

    updateUser(user: User) {
        return this.http.put(
            environment.baseUrl + '/api/user/' + user._id,
            {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        );
    }

    deleteUserById(userId: string) {
        return this.http.delete(environment.baseUrl + '/api/user/' + userId);
    }
}





