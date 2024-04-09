import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DetailsFish, Fish } from 'src/app/types/post';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  fish = {} as Fish;
  detailsFish: DetailsFish = {
    name: '',
    image: '',
    type: '',
    description: '',
  };

  form = this.fb.group({
    name: ['', [Validators.required], Validators.minLength(2)],
    image: ['', [Validators.required, Validators.pattern('/^https?:\/\//')]],
    type: ['', [Validators.required], Validators.minLength(3)],
    description: ['', [Validators.required], Validators.minLength(20)],
  })

  constructor(private api: AppService,
    private router: Router,
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRouter.params.subscribe((data) => {


      const id = data['fishId'];
      this.api.getCurrentFish(id).subscribe((fish) => {
        this.fish = fish;
        this.detailsFish = {
          name: fish.name,
          image: fish.image,
          type: fish.type,
          description: fish.description,
        }
      })
    });
  }

  saveEditFish(): void {
    if (this.form.invalid) {
      return
    }

    this.detailsFish = this.form.value as DetailsFish

    console.log(({ FORMVALUE: this.form.value }));
    console.log({ DETAILSVALUE: this.detailsFish });


    const { name, image,
      type, description } = this.form.value;

    const fishId = this.fish._id;

    console.log({ 'DETAIL_FISH': this.form.value });
    console.log({ "API_FISH": fishId });

    this.api
      .updatePostFish(fishId!, name!, image!, type!, description!)
      .subscribe(() => {
        this.router.navigate(['/catalog'])
      });
  }
}
