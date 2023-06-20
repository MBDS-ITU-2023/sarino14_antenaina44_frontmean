import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  loginFailed: boolean = false;
  hide: boolean = true;
  
  username = "admin";
  password = "admin";

  constructor(
    private authenticationService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;
    this.authenticationService.login(username, password);
    if (!this.authenticationService.isLoggedIn()) {
      this.loginFailed = true;
    } else {
      this.router.navigate(['/home']);
    }
  }
}
