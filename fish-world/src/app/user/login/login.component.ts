import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private userService: UserService, protected router: Router, private fb:FormBuilder) {}

  login(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.userService
    .login(email!, password!)
    .subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
