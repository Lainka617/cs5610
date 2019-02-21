import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';


// import { Http, RequestOptions, Response } from '@angular/http';
// import 'rxjs/Rx';
// import { environment } from '../../environments/environment';
// import { Router } from '@angular/router';


@Injectable()
export class UserService {

    constructor() {}

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
        this.users.push(new User(user._id, user.username, user.password, user.firstName, user.lastName, user.email));
    }
    // createUser(user: any) {
    //     user._id = Math.random();
    //     this.users.push(user);
    //     return user;
    // }
    findUserByCredential(username: String, password: String) {
        return this.users.find( function (user) {
            return user.username === username && user.password === password;
        });
    }

    findUserByUsername(username: String) {
        return this.users.find( function (user) {
            return user.username === username;
        });

    }
    findUserById(userId: String) {
        return this.users.find(function(user) {
            return user._id === userId;
        });
    }
    // findUserById(userId: string) {
    //     for (let x = 0; x < this.users.length; x++) {
    //         if (this.users[x]._id === userId) { return this.users[x]; }
    //     }
    // }
    updateUser(user: User) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]._id === user._id) {
                this.users[i].firstName = user.firstName;
                this.users[i].lastName = user.lastName;
                return this.users[i];
            }
        }
    }

    deleteUserById(userId: String) {
        for (const i in this.users) {
            if (this.users[i]._id === userId) {
                const j = +i;
                this.users.splice(j, 1);
            }
        }
    }
}





