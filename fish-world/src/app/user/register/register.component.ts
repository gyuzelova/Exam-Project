import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  get passGroup() {
    return this.form.get('passGroup');
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  register(): void {
    if (this.form.invalid) {
      console.log('Form is invalid');

      return;
    }

    const {
      email,
      gender,
      passGroup: { password, rePassword } = {},
    } = this.form.value;
    console.log({ 'FORMVALUE': this.form.value });
    this.form.reset()
    this.userService
      .register(email!, gender!, password!, rePassword!)
      .subscribe(() => {
        console.log(email!, gender!, password!, rePassword!);
        this.router.navigate(['/home']);
      });
  }
}




