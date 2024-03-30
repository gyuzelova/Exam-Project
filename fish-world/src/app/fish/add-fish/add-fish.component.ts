import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-fish',
  templateUrl: './add-fish.component.html',
  styleUrls: ['./add-fish.component.css']
})
export class AddFishComponent {

  form = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: ['', [Validators.required]],
    description: ['', [Validators.required]],
  })

  constructor(private api: AppService, private router: Router, private fb:FormBuilder) { }

  add(): void {
    if (this.form.invalid) {
      return
    }
const { name, image, 
  type, description} = this.form.value;

  this.api
  .createPostFish(name!, image!, type!, description!)
  .subscribe(()=> {
    this.router.navigate(['/catalog'])
  });
  }

}