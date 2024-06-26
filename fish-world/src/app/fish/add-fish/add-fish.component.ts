import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/fish/app.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-add-fish',
  templateUrl: './add-fish.component.html',
  styleUrls: ['./add-fish.component.css']
})
export class AddFishComponent {

  form = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    image: ['', [Validators.required]],
    type: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(20)])],
  })

  constructor(private api: AppService, private router: Router, private userService: UserService, private fb: FormBuilder) { }

  add(): void {
    if (this.form.invalid) {
      return
    }
    const { name, image, type, description } = this.form.value;
    const userId: string = this.userService.isUserId
    this.api
      .createPostFish(name!, image!, type!, description!, userId!)
      .subscribe(() => {
        this.router.navigate(['/catalog'])
      });


  }

}