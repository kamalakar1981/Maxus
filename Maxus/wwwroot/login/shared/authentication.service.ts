import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class User {
    constructor(
        public email: string,
        public password: string) { }
}

var users = [
    new User('admin@admin.com', 'adm9'),
    new User('user1@gmail.com', 'a23'),
    new User('nam@gmail.com', 'nam'),
    new User('admin@gmail.com', 'admin'),
    new User('user2@gmail.com', 'user2')
];

@Injectable()
export class AuthenticationService {

    constructor(
        private _router: Router) { }

    logout() {
        localStorage.removeItem("user");
        this._router.navigate(['login']);
    }

    login(user) {
        var authenticatedUser = users.find(u => u.email === user.email);
        if (authenticatedUser) {
            localStorage.setItem("user", authenticatedUser[0]);
            this._router.navigate(['home']);
            return true;
        }
      
        return false;

    }
  
  

checkCredentials(){
    if (localStorage.getItem("user") === null) {
        this._router.navigate(['login']);
    }
} 
}
