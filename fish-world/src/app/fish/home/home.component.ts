import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/fish/app.service';
import { Fish } from 'src/app/types/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fishPost: Fish[] = [];

  constructor(private api: AppService) { }
  ngOnInit(): void {
    this.api.getFishs().subscribe({
      next: (data) => {
        this.fishPost = data;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
