import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { User } from '../model/user';

const USERS = [
	new User(1, 'aswin', 'a123', 'ADMIN'),
	new User(2, 'kumar', 'k123', 'USER'),
	new User(3, 'pavan', 'p123', 'USER')
];
let usersObservable = of(USERS);

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private redirectUrl: string = '/home';
	private loginUrl: string = '/login';
	private isloggedIn: boolean = false;
	private loggedInUser = {} as User;
	getAllUsers(): Observable<User[]> {
		return usersObservable;
	}
	isUserAuthenticated(username: string, password: string): Observable<boolean> {
		return this.getAllUsers().pipe(
			map(users => {
				let user = users.find(user => (user.username === username) && (user.password === password));
				if (user) {
					this.isloggedIn = true;
					this.loggedInUser = user;
				} else {
					this.isloggedIn = false;
				}
				return this.isloggedIn;
			}));
	}
	isUserLoggedIn(): boolean {
		return this.isloggedIn;
	}
	getRedirectUrl(): string {
		return this.redirectUrl;
	}
	setRedirectUrl(url: string): void {
		this.redirectUrl = url;
	}
	getLoginUrl(): string {
		return this.loginUrl;
	}
	getLoggedInUser(): User {
		return this.loggedInUser;
	}
	logoutUser(): void {
		this.isloggedIn = false;
	}
}
