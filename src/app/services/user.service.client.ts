import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    users = [
        {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder', email: 'alice@123.com' },
        {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley', email: 'bob@123.com' },
        {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia', email: 'charly@123.com' },
        {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi', email: 'jannunzi@123.com' }
    ];

    api = {
        'createUser' : this.createUser,
        'findUserByCredential': this.findUserByCredential,
        'findUserByUsername' : this.findUserByUsername,
        'findUserById' : this.findUserById,
        'updateUser' : this.updateUser,
        'deleteUserById' : this.deleteUserById
    };

    createUser(user: User) {
        return this.http.post( environment.baseUrl + '/api/user/', user);
    }

    findUserByCredential(username: string, password: string) {
        return this.http.get( environment.baseUrl + '/api/user?username=' + username + '&password=' + password);
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





