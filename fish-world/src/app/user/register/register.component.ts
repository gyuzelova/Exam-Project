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
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required]],
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
  ) {}

  register(): void {
    if (this.form.invalid) {
      console.log('Form is invalid');
      
      return;
    }

    const {
      email,
      passGroup: { password, rePassword } = {},
    } = this.form.value;
console.log({'FORMVALUE':  this.form.value});

    this.userService
      .register( email!,  password!, rePassword!)
      .subscribe(() => {
        console.log('navigate work');
        console.log(email!,  password!, rePassword!);
        
        
        this.router.navigate(['/home']);

      });
  }
}




