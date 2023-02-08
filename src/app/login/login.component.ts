import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidCredentialMsg = '';
  constructor(private router: Router, private authService: AuthService) {
	}
	loginForm = new FormGroup({
		username: new FormControl(),
		password: new FormControl()
	});
  onFormSubmit() {
    let uname = this.loginForm.get('username')?.value;
		let pwd = this.loginForm.get('password')?.value;
    this.authService.isUserAuthenticated(uname, pwd).subscribe(
			authenticated => {
				if (authenticated) {
					let url = this.authService.getRedirectUrl();
					console.log('Redirect Url:' + url);
					this.router.navigate([url]);
				} else {
					this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
				}
			}
		);
  }

  clearForm() {
    this.loginForm.reset();
  }

}
